export function getActiveSidebarKey(
  pathname: string,
  items: { key: string; link: string }[]
): string | null {
  if (!pathname) return null;

  // Normalize trailing slash
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const exactMatch = items.find((item) => item.link === normalizedPath);

  if (exactMatch) return exactMatch.key;

  const nestedMatch = items.find((item) => {
    // Root paths like /influencer or /brand should only match exactly,
    const segmentCount = item.link.split("/").filter(Boolean).length;
    if (segmentCount <= 1) return false;
    return normalizedPath.startsWith(item.link + "/");
  });

  return nestedMatch?.key ?? null;
}
