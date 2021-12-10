/* eslint-disable no-use-before-define */
// eslint-disable-next-line max-classes-per-file
export type Response<L, A> = Failure<L, A> | Success<L, A>;

export class Success<L, A> {
	readonly value: A;

	constructor(value: A) {
		this.value = value;
	}

	isFailure(): this is Failure<L, A> {
		return false;
	}

	isSucess(): this is Success<L, A> {
		return true;
	}
}

export class Failure<L, A> {
	readonly error: L;

	constructor(error: L) {
		this.error = error;
	}

	isFailure(): this is Failure<L, A> {
		return true;
	}

	isSucess(): this is Success<L, A> {
		return false;
	}
}

export const failure = <L, A>(l: L): Response<L, A> => {
	return new Failure(l);
};

export const success = <L, A>(a: A): Response<L, A> => {
	return new Success<L, A>(a);
};
