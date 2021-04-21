/**
 * Retrieves the type from data
 */
export default function relationshipGetType(
  relation: { data: Record<string, string | null>[] | Record<string, string | null> },
): string | null {
  if (!relation.data || (Array.isArray(relation.data) && relation.data.length === 0)) {
    return null;
  }

  if (Array.isArray(relation.data)) {
    return relation.data[0].type;
  }

  return relation.data.type;
}
