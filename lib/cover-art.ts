// Deterministic gradient "cover art" for records without an uploaded image.

const WORK_GRADIENTS = [
  "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.55), transparent 55%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.45), transparent 55%)",
  "radial-gradient(circle at 70% 30%, rgba(236,72,153,0.5), transparent 55%), radial-gradient(circle at 20% 80%, rgba(99,102,241,0.5), transparent 55%)",
  "radial-gradient(circle at 50% 20%, rgba(52,211,153,0.5), transparent 55%), radial-gradient(circle at 50% 90%, rgba(168,85,247,0.45), transparent 55%)",
  "radial-gradient(circle at 30% 70%, rgba(251,191,36,0.45), transparent 55%), radial-gradient(circle at 80% 20%, rgba(236,72,153,0.4), transparent 55%)",
  "radial-gradient(circle at 60% 40%, rgba(56,189,248,0.55), transparent 55%), radial-gradient(circle at 20% 70%, rgba(52,211,153,0.5), transparent 55%)",
]

const POST_GRADIENTS = [
  "radial-gradient(circle at 25% 25%, rgba(168,85,247,0.6), transparent 55%), radial-gradient(circle at 75% 75%, rgba(56,189,248,0.55), transparent 55%)",
  "radial-gradient(circle at 50% 30%, rgba(236,72,153,0.55), transparent 55%), radial-gradient(circle at 50% 80%, rgba(99,102,241,0.55), transparent 55%)",
  "radial-gradient(circle at 30% 70%, rgba(52,211,153,0.55), transparent 55%), radial-gradient(circle at 70% 20%, rgba(168,85,247,0.5), transparent 55%)",
  "radial-gradient(circle at 70% 30%, rgba(56,189,248,0.55), transparent 55%), radial-gradient(circle at 30% 80%, rgba(236,72,153,0.5), transparent 55%)",
  "radial-gradient(circle at 20% 60%, rgba(251,191,36,0.5), transparent 55%), radial-gradient(circle at 80% 40%, rgba(168,85,247,0.5), transparent 55%)",
]

function hashSlug(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function workGradient(slug: string) {
  return WORK_GRADIENTS[hashSlug(slug) % WORK_GRADIENTS.length]
}

export function postGradient(slug: string) {
  return POST_GRADIENTS[hashSlug(slug) % POST_GRADIENTS.length]
}
