import {    
    eventListReducer, 
    eventRetrieveReducer,
    listState,
    retrieveState    
} from '../../src/reducers/eventReducer';

describe('event reducer', () => {
    it('should return the initial state', () => {
        expect(eventListReducer(listState, {})).toEqual({
            data: [],
            page: {},
            loading: false,
        });
    });
    it('should store the retrieve', () => {
        expect(eventRetrieveReducer(retrieveState, {})).toEqual({
            data: {},
            loading: false,
        })
    })
})