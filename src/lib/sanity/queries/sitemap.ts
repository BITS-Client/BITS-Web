import { sanityClient } from '../client';

export async function getSitemapData() {
	return sanityClient.fetch(`{
    "services": *[_type == "service"] { slug, _updatedAt },
    "projects": *[_type == "project"] { slug, _updatedAt },
    "posts": *[_type == "post"] { slug, _updatedAt }
  }`);
}
