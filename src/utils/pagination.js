function parsePagination(query = {}, { defaultPageSize = 10, maxPageSize = 50 } = {}) {
  let page = Number.parseInt(query.page, 10);
  let pageSize = Number.parseInt(query.pageSize, 10);

  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(pageSize) || pageSize < 1) pageSize = defaultPageSize;
  if (pageSize > maxPageSize) pageSize = maxPageSize;

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
  };
}

function buildPaginatedResult(items, total, page, pageSize) {
  const safeTotal = Number(total) || 0;
  return {
    items,
    page,
    pageSize,
    total: safeTotal,
    totalPages: Math.max(1, Math.ceil(safeTotal / pageSize)),
  };
}

module.exports = { parsePagination, buildPaginatedResult };
