import path from 'path'
import prompts from 'prompts'
import { file } from './core'
import { Context } from './types'

/**
 * Confirm destination.
 */
export default async (ctx: Context): Promise<void> => {
  // resolve dest path
  ctx.dest = path.resolve(ctx.project)

  // exist
  const exists = await file.exists(ctx.dest)

  // dist not exists
  if (exists === false) return

  // force mode
  if (ctx.options.force != null && ctx.options.force) {
    return await file.remove(ctx.dest)
  }

  // destination is file
  if (exists !== 'dir') throw new Error(`Cannot create ${ctx.project}: File exists.`)

  // is empty dir
  if (await file.isEmpty(ctx.dest)) return

  // is current working directory
  const isCurrent = ctx.dest === process.cwd()

  // // require node >= v8.3.0
  console.clear()

  // confirm & choose next
  const { choose, other }: { choose?: string, other?: string } = await prompts([
    {
      name: 'sure',
      type: 'confirm',
      message: isCurrent ? 'Scan in current directory?' : 'Scan other directories?'
    },

    {
      name: 'choose',
      type: (prev: boolean) => prev ? 'text' : 'select',
      initial: (prev: boolean) => prev ? './' : false,
      message: `${isCurrent ? 'Current' : 'Target'} directory is not empty. How to continue?`,
      hint: ' ',
      choices: [
        { title: 'Other', value: 'Other' },
        { title: 'Cancel', value: 'cancel' }
      ]
    },
    {
      name: 'other',
      type: prev => prev == 'Other' ? 'text' : null,
      message: 'Please enter the other directory to scan? \n (Tips: If Ctrl + C copy the directory path and Ctrl + V does not work, right-click to paste the directory path!)'
    }
  ])

  console.log('other', other)
  console.log('choose', choose)
  if (other) {
    ctx.dest = other || ''
  }else if (choose) {
    ctx.dest = path.resolve('./')
  }else if (!choose && !other) {
    ctx.dest = path.resolve('./')
  }

  // Otherwise is cancel task
  if (choose == null || choose === 'cancel') throw new Error('You have cancelled this task.')

  // Merge not require any action
}
