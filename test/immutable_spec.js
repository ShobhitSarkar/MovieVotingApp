import {expect} from 'chai';
import {List} from "immutable";

describe ('immutability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        /**
         * Writing a test using a counter (which maintains the state)
         */
        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });

        /**
         * Writing a test using a list
         * Key Idea : The operation that adds a new produces a new list = old list = added movie
         * Crucial : The old state remains unchanged after the operation
         */
        describe ('A list', () => {
            function addMovie(currentState, movie){
                return currentState.push(movie);
            }

            it ('is immutable', () => {
                let state = List.of('Trainspotting', '28 days later');
                let nextState = addMovie(state, 'Sunshine');

                expect(nextState).to.equal(List.of(
                    'Trainspotting',
                    '28 days later',
                    'Sunshine'
                ));
                expect(state).to.equal(List.of(
                    'Trainspotting',
                    '28 days later'
                ));
            })
        })

        /**
         * Writing a test using a tree
         * SState tree is a nested data structure of Lists, Maps and other collections
         * Applying an operation to it involves producing a new state tree (without touching the previous one)
         *
         *
         * In this case if the state tree is a Map with a key 'movies' (which contains a list of movies),
         * adding a new movie means creating a new Map, where movies key points to a new list
         */
        describe('A tree', () => {
            function addMovie(currentState, movie){
                return currentState.set(
                    'movies',
                    currentState.get('movies').push(movie)
                );
            }

            it ('is immutable', () => {
                let state = Map({
                    movies: List.of('Trainspotting', '28 days later')
                });
                let nextState = addMovie(state, 'Sunshine');

                expect(nextState).to.equal(Map({
                    movies: List.of(
                        'Trainspotting',
                        '28 days later'
                )
                }));
            });
        });
    });
})