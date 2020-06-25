import { Dirent, promises as fs } from 'fs'

const args = process.argv.slice(2)

async function recursiveRmdir(
  parent: string
): Promise<void> {
  try {
    const children = await fs.readdir(parent, { withFileTypes: true })
    await Promise.all(
      children.map(
        async (
          child: Dirent
        ): Promise<void> => {
          const childPath = `${parent}/${child.name}`
          if(child.isFile()) {
            await fs.unlink(childPath)
          } else {
            await recursiveRmdir(childPath)
          }
        }
      )
    )
    await fs.rmdir(parent)
  } catch{}
}

(async () => {
  await Promise.all(args.map(recursiveRmdir))
})()
