export interface IColorInfo {
  hex: {
    value: string //'#EB80E4'
    clean: string //'EB80E4'
  }
  rgb: {
    fraction: {
      r: number //0.9215686274509803
      g: number //0.5019607843137255
      b: number //0.8941176470588236
    }
    r: number //235
    g: number //128
    b: number //228
    value: string //'rgb(235, 128, 228)'
  }
  hsl: {
    fraction: {
      h: number //0.8442367601246106
      s: number //0.7278911564625847
      l: number //0.7117647058823529
    }
    h: number //304
    s: number //73
    l: number //71
    value: string //'hsl(304, 73%, 71%)'
  }
  hsv: {
    fraction: {
      h: number //0.8442367601246106
      s: number //0.4553191489361702
      v: number //0.9215686274509803
    }
    value: string //'hsv(304, 46%, 92%)'
    h: number //304
    s: number //46
    v: number //92
  }
  name: {
    value: string //'Lavender Magenta'
    closest_named_hex: string //'#EE82EE'
    exact_match_name: boolean //false
    distance: number //277
  }
  cmyk: {
    fraction: {
      c: number //0
      m: number //0.4553191489361702
      y: number //0.02978723404255309
      k: number //0.07843137254901966
    }
    value: string //'cmyk(0, 46, 3, 8)'
    c: number //0
    m: number //46
    y: number //3
    k: number //8
  }
  XYZ: {
    fraction: {
      X: number //0.7209443137254901
      Y: number //0.6194831372549019
      Z: number //0.9274788235294118
    }
    value: string //'XYZ(72, 62, 93)'
    X: number //72
    Y: number //62
    Z: number //93
  }
  image: {
    bare: string //'https://www.thecolorapi.com/id?format=svg&named=false&hex=EB80E4'
    named: string //'https://www.thecolorapi.com/id?format=svg&hex=EB80E4'
  }
  contrast: {
    value: string //'#000000'
  }
  _links: {
    self: {
      href: string //'/id?hex=EB80E4'
    }
  }
  _embedded: object //{}
}
