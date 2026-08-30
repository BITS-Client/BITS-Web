import { redirect } from '@sveltejs/kit';

export const load = ({ params }) => {
	return redirect(307, `/id/blog/${params.slug}`);
};
