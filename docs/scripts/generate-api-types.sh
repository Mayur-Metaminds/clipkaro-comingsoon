#!/bin/bash

# Generate API types from OpenAPI spec
# This script fetches the OpenAPI spec from your NestJS backend and generates TypeScript types + Zod schemas

set -e

BACKEND_URL="${BACKEND_URL:-http://localhost:3000}"
OPENAPI_ENDPOINT="${OPENAPI_ENDPOINT:-/api-json}"

echo "🔄 Fetching OpenAPI spec from ${BACKEND_URL}${OPENAPI_ENDPOINT}..."

# Generate TypeScript types
npx openapi-typescript "${BACKEND_URL}${OPENAPI_ENDPOINT}" \
  --output src/types/api-generated.ts \
  --path-params-as-types

echo "✅ Generated TypeScript types → src/types/api-generated.ts"

# Optional: Generate Zod schemas
# npx openapi-zod-client "${BACKEND_URL}${OPENAPI_ENDPOINT}" \
#   --output src/lib/api/generated-client.ts

echo "✅ Type generation complete!"
echo ""
echo "💡 Tip: Run 'npm run type-check' to verify generated types"
