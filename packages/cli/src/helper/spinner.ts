import ora from 'ora'
import pc from 'picocolors'

const spinner = ora('Loading unicorns')

export function spinnerStart(loadingMsg: string) {
  spinner.start()
  setTimeout(() => {
    spinner.color = 'yellow'
    spinner.text = `${loadingMsg} loading...`
  }, 1000)
}

export function spinnerStop() {
  spinner.stop()
}

export function successPrompt(successMsg: string) {
  spinner.succeed(successMsg)
}

export function warnPrompt(warnMsg: string) {
  spinner.warn(warnMsg)
}

export function failPrompt(failMsg: string) {
  spinner.fail(pc.red(failMsg))
}
