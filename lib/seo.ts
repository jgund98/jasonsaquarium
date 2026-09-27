/** Trim a meta description to what Google actually shows, cutting at the last full sentence. */
export function clip(text: string, max = 158): string {
  const t = text.replace(/s+/g, " ").trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const end = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  if (end > 60) return head.slice(0, end + 1);
  const sp = head.lastIndexOf(" ");
  return head.slice(0, sp > 60 ? sp : max).replace(/[,:;]$/, "") + ".";
}
