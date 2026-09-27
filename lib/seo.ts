/** Trim a meta description to what Google actually shows (about 158 chars).
 *  Prefers a clean sentence end; falls back to a word boundary with an ellipsis
 *  when the sentence cut would throw away most of the snippet. */
export function clip(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const end = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  if (end >= 110) return head.slice(0, end + 1);
  const sp = t.slice(0, max - 1).lastIndexOf(" ");
  return t.slice(0, sp > 60 ? sp : max - 1).replace(/[,:;.]$/, "") + "…";
}
