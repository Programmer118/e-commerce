import sanityClient from '@sanity/client'
import  imageUrlBuilder  from '@sanity/image-url'

export const client = sanityClient({
    projectId:'6pj0dl7b',
    dataset:'production',
    apiVersion:"2023-02-04",
    useCdn:true,
    token:process.env.SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) =>builder.image(source)