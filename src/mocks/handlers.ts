import { rest } from "msw";
const responseToken = {
  token_type: "Bearer",
  expires_in: 3601,
  access_token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJuakZicGFHZ0E0Vzdoc1I4bXdTZjNDRGhOZkdqZXFRZDRrc2JyVTUweVMzU1M0UzdCWCIsImp0aSI6IjA5OWZiMjZjYTAyZDNlNmJmOWU2NWVkNzA0MzcxZWQxMDA0Nzk4YTA0OTdjMTFiMzU0YzE3YWM0MDg5OTU4NzdjYWRhMzUyN2RmZGY3NDJjIiwiaWF0IjoxNjY4MTAwMjQzLCJuYmYiOjE2NjgxMDAyNDMsImV4cCI6MTY2ODEwMzg0Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.BuXCcaE2yXE36iCC2Kq-KUj-w6drowL-NIjIJBFQf-7o5BeKCIaUajW4XZfWL7SHXzxordpTWeqVxNZCgAb-1xBqAXRxZv_pq8TybuL9JNZ2F2YlNkt_DlCfunicSnwmsKJHlTdaWoKNae_nrFtUU2FPS2-Jx1KVvCsBmgIafIVaCFV3-HdSEUi5qIa5Gk0c7JPIYA17k10PSCLMJKe-BhbxdaRXaAl0-nQ-i9nYkv-BNa-nTiOPDAA_EbzMGaLGpa0mEIAWRpMgX2Gv2aI-lT8MwB-CizVymWQpPapFQX0SwjP0yMsbIDlPO7U_0tNukKoxGa1SBnY4SIeQI3Q1dw",
};
export const restHandlers = [
  rest.post("https://api.petfinder.com/v2/oauth2/token", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseToken));
  }),
];
