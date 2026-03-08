import { launchBrowser } from "./browser.js"
import { deleteNote } from "./manage.js"

const noteId = "69ad51030000000022031d44"
const account = "default"

async function run() {
  const managed = await launchBrowser(account)
  try {
    console.log(`Deleting note ${noteId}...`)
    await deleteNote(managed.page, noteId)
    await managed.saveCookies()
    console.log("Deleted!")
  } catch (error) {
    console.error(`ERROR: ${error}`)
  } finally {
    await managed.close()
  }
}

run()
