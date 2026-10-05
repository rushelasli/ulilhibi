// Browser globals stubbed BEFORE any app module runs (imported first).
const storage = new Map<string, string>()

const doc = {
  lang: 'id',
  title: '',
  documentElement: {
    style: {} as Record<string, string>,
    lang: 'id' as string,
  },
  hidden: false,
  body: { appendChild() {}, removeChild() {} },
  getElementById: () => null,
  querySelector: () => null,
  addEventListener() {},
  removeEventListener() {},
  createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
  baseURI: 'http://localhost/',
}

const win = {
  scrollY: 0,
  scrollX: 0,
  scrollTo() {},
  innerWidth: 1280,
  innerHeight: 800,
  devicePixelRatio: 1,
  addEventListener() {},
  removeEventListener() {},
  requestAnimationFrame: (cb: (t: number) => void) => setTimeout(() => cb(0), 0),
  cancelAnimationFrame: (id: number) => clearTimeout(id),
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  document: doc,
  history: {
    state: null as Record<string, unknown> | null,
    pushState(s: Record<string, unknown> | null) {
      this.state = s
    },
    replaceState(s: Record<string, unknown> | null) {
      this.state = s
    },
    back() {},
    forward() {},
    go() {},
  },
  location: {
    href: 'http://localhost/',
    origin: 'http://localhost/',
    pathname: '/',
    search: '',
    hash: '',
    host: 'localhost',
    hostname: 'localhost',
    protocol: 'http:',
    port: '',
    assign() {},
    replace() {},
  },
}

const nav = { language: 'id', userAgent: 'node', platform: 'node' }

const localStorageMock = {
  getItem: (k: string) => storage.get(k) ?? null,
  setItem: (k: string, v: string) => void storage.set(k, v),
  removeItem: (k: string) => void storage.delete(k),
  clear: () => storage.clear(),
}

// Some globals (navigator, location, history) are getters in modern Node —
// defineProperty with a getter/setter works for both cases.
function setGlobal(name: string, value: unknown) {
  try {
    Object.defineProperty(globalThis, name, {
      value,
      configurable: true,
      writable: true,
      enumerable: true,
    })
  } catch {
    ;(globalThis as unknown as Record<string, unknown>)[name] = value
  }
}

setGlobal('window', win)
setGlobal('document', doc)
setGlobal('navigator', nav)
setGlobal('localStorage', localStorageMock)
setGlobal('location', win.location)
setGlobal('history', win.history)
setGlobal('HTMLElement', class HTMLElement {})
setGlobal('customElements', { define() {}, get() {} })
setGlobal(
  'ResizeObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)
setGlobal(
  'IntersectionObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)
setGlobal('matchMedia', win.matchMedia)
