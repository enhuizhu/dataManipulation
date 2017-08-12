'use strict';

const expect = require('chai').expect;
const dataService = require('../index');

const baseObj = { 
   "count":15,
   "amount_total":425,
   "num_items_total":3,
   "gender":{  
      "F":{  
         "count":5,
         "amount_total":225,
         "num_items_total":3
      },
      "M":{  
         "count":10,
         "amount_total":200,
         "num_items_total":5
      }
   },
   "currency":{  
      "EUR":{  
         "count":13,
         "amount_total":175,
         "num_items_total":6
      },
      "USD":{  
         "count":2,
         "amount_total":250,
         "num_items_total":6
      }
   }
};

const entry = {
   "gender": "M",
   "amount": 17.0,
   "num_items": 2,
   "currency": "EUR"
};

describe('data manipulation', () => {
    it('when all the key already exist', () => {
        let newObj =  dataService.dataManipulation(baseObj, entry);
        let expectedObj = { count: 16,
          amount_total: 442,
          num_items_total: 5,
          gender:
           { F: { count: 5, amount_total: 225, num_items_total: 3 },
             M: { count: 11, amount_total: 217, num_items_total: 7 } },
          currency:
           { EUR: { count: 14, amount_total: 192, num_items_total: 8 },
             USD: { count: 2, amount_total: 250, num_items_total: 6 } } 
        };
        
        expect(newObj).to.deep.equal(expectedObj);
    });

    it('when key not exsit in original object', () => {
        let newEntry = {
            "weekday": "monday",
            "amount": 17.0,
            "num_items": 2,
            "currency": "EUR"
        };

        let newObj =  dataService.dataManipulation(baseObj, newEntry);
        
        let expectedObj = { 
            count: 16,
            amount_total: 442,
            num_items_total: 5,
            gender:
             { F: { count: 5, amount_total: 225, num_items_total: 3 },
               M: { count: 10, amount_total: 200, num_items_total: 5 } },
            currency:
             { EUR: { count: 14, amount_total: 192, num_items_total: 8 },
               USD: { count: 2, amount_total: 250, num_items_total: 6 } },
            weekday: { monday: { count: 1, amount_total: 17, num_items_total: 2 } } 
        };

        expect(expectedObj).to.deep.equal(newObj);      
    });

    it('convertEntryToComplicateObj', () => {
        let newObj = dataService.convertEntryToComplicateObj(entry);
        
        let expectedObj = { 
            amount_total: 17,
            num_items_total: 2,
            gender: { M: { amount_total: 17, num_items_total: 2 , count: 1} },
            currency: { EUR: { amount_total: 17, num_items_total: 2, count: 1} },
            count: 1 
        };
        
        expect(newObj).to.deep.equal(expectedObj);
    });

    it('getAllKeyPathes', () => {
        let paths = dataService.getAllKeyPathes(baseObj);
        let expectedPaths = [ 
          '.count',
          '.amount_total',
          '.num_items_total',
          '.gender.F.count',
          '.gender.F.amount_total',
          '.gender.F.num_items_total',
          '.gender.M.count',
          '.gender.M.amount_total',
          '.gender.M.num_items_total',
          '.currency.EUR.count',
          '.currency.EUR.amount_total',
          '.currency.EUR.num_items_total',
          '.currency.USD.count',
          '.currency.USD.amount_total',
          '.currency.USD.num_items_total' 
        ];

        // console.log('paths', paths);
        expect(paths).to.deep.equal(expectedPaths);         
    });
});