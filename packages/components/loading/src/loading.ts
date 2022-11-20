import { useNamespace } from '@fuzzy/utils'
import {
  Transition,
  createVNode,
  vShow,
  withCtx,
  withDirectives,
} from 'vue'
import type { LoadingOptionsResolved } from './types'
export function createLoadingComponent(options: LoadingOptionsResolved) {
  const data = reactive({
    ...options,
    visible: false,
  })
  const { n } = useNamespace('loading')
  const afterLeaveFlag = ref(false)

  function handleAfterLeave() {
    if (!afterLeaveFlag.value) return
    afterLeaveFlag.value = false
    // destroySelf()
  }

  function close() {
    if (options.beforeClose && !options.beforeClose()) return

    data.visible = false
    options.closed?.()
  }

  const fuloadingComponent = {
    name: 'FLoading',
    setup() {
      return () => {
        const svg = data.svg

        const spinner = h(
          'svg',
          {
            class: 'circular',
            viewBox: data.svgViewBox ? data.svgViewBox : '0 0 50 50',
            ...(svg ? { innerHTML: svg } : {}),
          },
          [
            h('circle', {
              class: 'path',
              cx: '25',
              cy: '25',
              r: '20',
              fill: 'none',
            }),
          ],
        )

        const spinnerText = data.text
          ? h('p', { class: n('text') }, [data.text])
          : undefined

        return h(
          Transition,
          {
            name: 'f-loading-fade',
            onAfterLeave: handleAfterLeave,
          },
          {
            default: withCtx(() => [
              withDirectives(
                createVNode(
                  'div',
                  {
                    style: {
                      backgroundColor: data.background || '',
                    },
                    class: [
                      n('mask'),
                      data.customClass,
                    ],
                  },
                  [
                    h(
                      'div',
                      {
                        class: n('mask', 'spinner'),
                      },
                      [spinner, spinnerText],
                    ),
                  ],
                ),
                [[vShow, data.visible]],
              ),
            ]),
          },
        )
      }
    },
  }

  const loadingInstance = createApp(fuloadingComponent)
  const vm = loadingInstance.mount(document.createElement('div'))

  return {
    vm,
    close,
    get $el(): HTMLElement {
      return vm.$el
    },
  }
}

export type LoadingInstance = ReturnType<typeof createLoadingComponent>
