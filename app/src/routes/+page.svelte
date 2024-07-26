<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import * as Card from '$lib/components/ui/card';
	import Welcome from '../components/Welcome.svelte';
	import type { PageData } from './$types';
	import CardSanity from '../components/CardSanity.svelte';
	import { urlFor } from '$lib/sanity/image';
	import { formatDate } from '$lib/utils/index';
	import MailList from '$lib/components/ui/mail/mail-list.svelte';
	import { mails } from '$lib/components/ui/mail/data.js';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: posts } = $q);
</script>

<div>
	<section>
		{#if posts.length}
			{#each posts as post}
				<Card.Root>
					<Card.Header>
						<Card.Title tag="h1"
							><a href={`/post/${post.slug.current}`}>
								{post.title}
							</a></Card.Title
						>
						{#if post.excerpt}
							<Card.Description>
								<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
									<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
									<p class="space-y-1">{post.excerpt}</p>
								</div></Card.Description
							>
						{/if}
					</Card.Header>
					<Card.Content>
						<a class="card" href={`/post/${post.slug.current}`}>
							{#if post.mainImage}
								<imga
									class="card__cover"
									src={urlFor(post.mainImage).width(500).height(300).url()}
									alt="Cover image for {post.title}"
								/>
							{:else}
								<div class="card__cover--none" />
							{/if}
						</a>
					</Card.Content>
					<!-- <Card.Footer>
						<p>Card Footer</p>
					</Card.Footer> -->
				</Card.Root>
			{/each}
		{:else}
			<Welcome />
		{/if}
	</section>
	<MailList items={mails} />
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		padding: var(--space-2);
		padding: 9px;
		position: relative;
		color: var(--black);
		text-decoration: none;
	}

	.card .card__container {
		margin: 0 var(--space-1) 0;
	}

	.card .card__cover {
		width: 100%;
		height: 231px;
		-o-object-fit: cover;
		object-fit: cover;
	}

	.card .card__cover--none {
		width: 100%;
		height: 231px;
		background: var(--black);
	}

	.card .card__title {
		font-family: var(--font-family-sans);
		font-weight: 800;
		font-size: var(--font-size-7);
		line-height: var(--line-height-6);
		letter-spacing: -0.025em;
		margin: var(--space-3) 0;
	}

	.card .card__excerpt {
		font-family: var(--font-family-serif);
		font-weight: 400;
		font-size: var(--font-size-4);
		line-height: var(--line-height-3);
		margin-top: 0;
	}

	.card .card__date {
		font-weight: 600;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-1);
		margin-top: calc(var(----space-4) + 7);
	}

	.card:hover .card__title {
		opacity: 0.8;
		transition: 0.2s;
	}

	.card:first-child {
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	.card:last-child {
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	@media (min-width: 575px) {
		.card .card__title {
			margin-top: var(--space-4);
		}
	}

	@media (min-width: 800px) {
		.card {
			flex-direction: row;
		}

		.card .card__container {
			margin: 0 var(--space-4) 0;
		}

		.card .card__cover,
		.card .card__cover--none {
			min-width: 366.5px;
			max-width: 366.5px;
			max-height: 231px;
		}
	}
</style>
