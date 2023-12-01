import request from 'supertest';
import app from '../../src/app.js';
import axios from 'axios';
import resultByNameValid from '../../mocks/resultByNameValid.json';
import resultByCodeValid from '../../mocks/resultByCodeValid.json';

jest.mock('axios');

describe('Country Routes Integration Tests', () => {


  describe('GET /api/countries/name/:name', () => {
    it('should return country data for a valid name', async () => {
      axios.get.mockResolvedValue({ data:  resultByNameValid});
      const response = await request(app).get('/api/countries/name/ireland');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('name.common', 'United Kingdom');
      expect(response.body[1]).toHaveProperty('name.common', 'Ireland');
    });

    it('should return 404 for an invalid name "hhh"', async () => {
        axios.get.mockImplementation(() => Promise.reject({
          response: { status: 404 }
        }));
    
        const response = await request(app).get('/api/countries/name/hhh');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ status: 404, message: "Country Not Found" });
      });

  describe('GET /api/countries/code/:code', () => {
    it('should return country data for a valid code', async () => {
      axios.get.mockResolvedValue({ data: resultByCodeValid });
      const response = await request(app).get('/api/countries/code/ie');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('name.common', 'Ireland');
    });

    it('should return 404 for an invalid code "ka"', async () => {
        axios.get.mockImplementation(() => Promise.reject({
          response: { status: 404 }
        }));
    
        const response = await request(app).get('/api/countries/code/ka');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ status: 404, message: "Country Not Found" });
      });
  });

  
  });
});
