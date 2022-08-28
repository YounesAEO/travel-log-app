import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './api';

const LogEntryForm = ({ location, onClose }) => {
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			const created = await createLogEntry({ ...data, ...location });
			console.log(created);
			onClose();
		} catch (error) {
			console.log(error);
			setError(error.message);
			setLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="entry-form">
			{error ? <h3>{error}</h3> : null}
			<label htmlFor="title"> Title </label>
			<input {...register('title')} required />
			<label htmlFor="description"> Description </label>
			<textarea {...register('description')} rows={3} />
			<label htmlFor="image"> Image </label>
			<input {...register('image')} type="url" />
			<label htmlFor="visitDate"> Visit Date </label>
			<input {...register('visitDate')} type="date" required />
			<button disabled={loading}>
				{' '}
				{loading ? 'Loading...' : 'Save Travel Location'}
			</button>
		</form>
	);
};

export default LogEntryForm;
