export default class JObject {
    private _value: Record<string, any>
    constructor(value?: any) {
      try {
        if (typeof value === 'string') {
          this._value = JSON.parse(value ?? '{}')
        } else {
          this._value = value
        }
      } catch (error) {
        this._value = {}
      }
    }
    static fromJson(value: string) {
      return new JObject(value)
    }
    ToValue = <T extends Record<string, any>, TK extends keyof T = keyof T>(key: TK): T[TK] | undefined => {
      return this._value[key as any]
    }
    ToJObject = <T extends Record<string, any>, TK extends keyof T = keyof T>(key: TK): JObject => {
      return new JObject(this._value[key as any])
    }
    SetValue = <T extends Record<string, any>, TK extends keyof T = keyof T>(key: TK, value: any) => {
      this._value[key as any] = value
    }
  }
