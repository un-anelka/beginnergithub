import request from "supertest";
import app from "../server.js";

import truth from "./te.js";


describe("testing truth ", () => {
    it("compared the two functions", () => {
        const rep = truth();
        expect(rep).toEqual(true)
    })
})




describe('GET /users', function () {
    it('responds with json', async function () {
        const response = await request(app)
            .get('/getAllblogs')
            .set('Accept', 'application/json')
            console.log(response)
        expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.title).toContain('');
    });
});