export function toSlug(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }
  
  export function isValidSlug(slug: string) {
    return /^[a-z0-9-]+$/.test(slug)
  }