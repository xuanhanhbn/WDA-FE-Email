import { Config } from './config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: headers => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibmV3cyIsIm5vdGlmaWNhdGlvbiIsInNlY3VyaXR5IiwicHJvZHVjdCIsInN0YXRpc3RpYyIsInNoYXJlIiwidHJhbnNhY3Rpb24iXSwidXNlcl9uYW1lIjoiaGFuZ28iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTY3NjQ1NjM4NCwiYXV0aG9yaXRpZXMiOlsiQ1JFQVRFX1VTRVIiLCJERUxFVEVfQUNDRVNTX0NPTlRST0wiLCJGSU5EX0RFVEFJTF9QUk9EVUNUX1BBQ0tBR0UiLCJSRU1PVkVfUk9MRV9QUk9EVUNUX1BBQ0tBR0UiLCJGSU5EX0FMTF9DQVRFR09SWSIsIkRFTEVURV9OT1RJRklDQVRJT05fRk9STSIsIkZJTkRfREVUQUlMX0FVVEhPUklUWSIsIkZJTkRfSU5WT0lDRVNfQllfSUQiLCJGSU5EX1RSQU5TQUNUSU9OX0hJU1RPUllfQllfVVNFUl9JRCIsIlVQREFURV9QUk9EVUNUX1BBQ0tBR0UiLCJGSU5EX0FMTF9ST0xFIiwiQ1JFQVRFX05PVElGSUNBVElPTl9GT1JNIiwiRklORF9ERVRBSUxfVFJBTlNBQ1RJT05fSElTVE9SWSIsIlVQREFURV9OT1RJRklDQVRJT05fRk9STSIsIkNSRUFURV9BQ0NFU1NfQ09OVFJPTCIsIkdFVF9BVVRIT1JJVFlfUk9MRV9IQVNOVCIsIlVQREFURV9HUk9VUCIsIkNSRUFURV9ORVdTIiwiRklORF9BTExfQUNDRVNTX0NPTlRST0wiLCJGSU5EX0FMTF9BVVRIRU5USUNBVEVfQVBJIiwiRklORF9ESVNUUklDVCIsIkZJTkRfQUxMX1RSQU5TQUNUSU9OIiwiRklORF9BTExfVVNFUiIsIkZJTkRfREVUQUlMX05PVElGSUNBVElPTl9GT1JNIiwiREVMRVRFX1dJU0hfTElTVF9CWV9QUk9EVUNUX0lEIiwiQ1JFQVRFX0FDQ09VTlRfQkFMQU5DRSIsIkZJTkRfUFJPVklOQ0UiLCJHRVRfVVNFUl9JRFNfQllfVFJBTlNBQ1RJT05fQ09ERSIsIkRFTEVURV9XSVNIX0xJU1QiLCJGSU5EX0FMTF9SRUNIQVJHRV9SRVFVRVNUIiwiRklORF9DT05GSUdfQllfVFlQRSIsIkRFTEVURV9ST0xFIiwiRklORF9ERVRBSUxfVFJBTlNBQ1RJT04iLCJGSU5EX0FMTF9DT05GSUdfQkFOS19BQ0NPVU5UIiwiREVMRVRFX1BST0RVQ1RfUEFDS0FHRSIsIkZJTkRfU1VCX0RJU1RSSUNUIiwiQ1JFQVRFX1dJU0hfTElTVCIsIkZJTkRfREVUQUlMX1JPTEUiLCJGSU5EX0NVUlJFTlRfQUNDT1VOVF9CQUxBTkNFIiwiQ1JFQVRfR1JPVVAiLCJGSU5EX0RFVEFJTF9HUk9VUCIsIkNSRUFURV9SRUNIQVJHRV9SRVFVRVNUIiwiRklORF9BTExfUFJPRFVDVF9UWVBFIiwiRklORF9BTExfTk9USUZJQ0FUSU9OIiwiRklORF9JTlZPSUNFU19CWV9VU0VSX0lEIiwiREVMRVRFX0FVVEhPUklUWSIsIkZJTkRfVVNFUl9JTl9UUkFOU0FDVElPTiIsIlJFTU9WRV9VU0VSU19JTl9UUkFOU0FDVElPTiIsIkZJTkRfQUxMX1BST0RVQ1RfUEFDS0FHRSIsIlVQREFURV9ST0xFIiwiQ1JFQVRFX1BST0RVQ1RfUEFDS0FHRSIsIkVYUE9SVF9VU0VSIiwiU0VUX0lTX0RFTEVURURfUFJPRFVDVF9QQUNLQUdFIiwiRklORF9BTExfQVVUSE9SSVRZIiwiQ1JFQVRFX0NPTkZJR19CQU5LX0FDQ09VTlQiLCJERUxFVEVfTkVXUyIsIkZJTkRfQUxMX1BST0RVQ1QiLCJBRFZBTkNFX1NFQVJDSF9UUkFOU0FDVElPTl9ISVNUT1JZIiwiRklORF9ERVRBSUxfVVNFUiIsIkZJTkRfUFJPRFVDVF9JTl9XSVNIX0xJU1QiLCJGSU5EX0RFVEFJTF9ORVdTIiwiR0VUX1BST0RVQ1RfSURTX0lOX1dJU0hfTElTVCIsIkFEVkFOQ0VfU0VBUkNIX1BST0RVQ1QiLCJERUxFVEVfR1JPVVAiLCJERUxFVEVfVVNFUiIsIkFEVkFOQ0VfU0VBUkNIX1BST0RVQ1RfUEFDS0FHRSIsIlVQREFURV9VU0VSIiwiRklORF9BTExfV0lTSF9MSVNUX09GX0NVUlJFTlRfVVNFUiIsIlVQREFURV9BQ0NFU1NfQ09OVFJPTCIsIkZJTkRfQUxMX05PVElGSUNBVElPTl9GT1JNIiwiVVBEQVRFX05FV1MiLCJDUkVBVEVfTk9USUZJQ0FUSU9OIiwiQ1JFQVRFX1RSQU5TQUNUSU9OIiwiRklORF9ERVRBSUxfTk9USUZJQ0FUSU9OIiwiRklORF9BTExfVFJBTlNBQ1RJT05fQllfQ1VSUkVOVF9VU0VSIiwiQURWQU5DRV9TRUFSQ0hfSU5WT0lDRVMiLCJVUERBVEVfUEFTU1dPUkRfVVNFUiIsIkNSRUFURV9ST0xFIiwiVVBEQVRFX1NUQVRVU19VU0VSIiwiQ1JFQVRFX1NFQVJDSF9ISVNUT1JZIiwiRklORF9ERVRBSUxfUFJPRFVDVCIsIkZJTkRfQUxMX0dST1VQIiwiRklORF9ERVRBSUxfU0VBUkNIX0hJU1RPUlkiLCJBRERfUk9MRV9QUk9EVUNUX1BBQ0tBR0UiLCJGSU5EX0FMTF9TRUFSQ0hfSElTVE9SWSIsIkFERF9VU0VSX0lOX1RSQU5TQUNUSU9OIl0sImp0aSI6ImE0MGVkZmY0LTgwYmItNGJlNS05NGYwLTRhYWE2MzViOGFhZCIsImNsaWVudF9pZCI6IndlYmFwcCJ9.skPUD43K7paOatf3yVqRdfB_yrxpmMYdzPe06JfY8vY'
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }

  return result
}

export const api = createApi({
  reducerPath: 'api',
  endpoints: () => ({})
})
