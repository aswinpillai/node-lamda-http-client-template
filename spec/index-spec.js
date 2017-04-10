const moxios = require('moxios');
const axios = require('axios');

const handler = require('../lib/index').handler;

describe('handler', () => {
    let event, context, callback, endpointUrl;

    beforeEach(() => {
        moxios.install();
        event = { baseUrl: 'https://api.example.com', path: '/hello/world' };
        callback = jasmine.createSpy('callback');
        endpointUrl = event.baseUrl + event.path;
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('makes a request to the expected endpoint', done => {
        handler(event, context, callback);

        moxios.wait(() => {
            expect(moxios.requests.mostRecent().url).toBe(endpointUrl);
            done();
        });
    });

    describe('when the request is successful', () => {
        it('calls the callback with no error and the response data', done => {
            const success = { status: 200, response: { message: 'hello, world' } };
            moxios.stubRequest(endpointUrl, success);

            handler(event, context, callback);

            moxios.wait(() => {
                expect(callback).toHaveBeenCalledWith(null, success.response);
                done();
            });
        });
    });

    describe('when the request is unsuccessful', () => {
        it('calls the callback with an error message and no response data', done => {
            moxios.stubRequest(endpointUrl, { status: 404 });

            handler(event, context, callback);

            moxios.wait(() => {
                expect(callback).toHaveBeenCalledWith('404 - not found');
                done();
            });
        });
    });
});