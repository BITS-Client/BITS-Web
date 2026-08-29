<script lang="ts">
	import { ChevronDown, Check } from '$lib/icons/lucide';
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		id?: string;
		value?: string;
		options: { value: string; label: string }[];
		placeholder?: string;
		_required?: boolean;
		onchange?: (value: string) => void;
		class?: string;
	}

	let {
		id = '',
		value = '',
		options = [],
		placeholder = '',
		_required = false,
		onchange,
		class: className = ''
	}: Props = $props();

	let isOpen = $state(false);
	let selectRef: HTMLDivElement;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(optValue: string) {
		value = optValue;
		isOpen = false;
		if (onchange) onchange(optValue);
	}

	function handleClickOutside(event: MouseEvent) {
		if (selectRef && !selectRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
		document.removeEventListener('keydown', handleKeydown);
	});

	const selectedOption = $derived(options.find((opt) => opt.value === value));
	const displayLabel = $derived(selectedOption?.label || placeholder || '');
</script>

<div class="custom-select {className}" bind:this={selectRef}>
	<button
		type="button"
		{id}
		class="select-trigger"
		class:open={isOpen}
		class:has-value={value !== ''}
		onclick={toggleDropdown}
		aria-expanded={isOpen}
		aria-haspopup="listbox"
	>
		<span class="select-value" class:placeholder={!value}>
			{displayLabel}
		</span>
		<span class="select-arrow-wrapper" class:open={isOpen}>
			<ChevronDown class="select-arrow" />
		</span>
	</button>

	{#if isOpen}
		<div class="select-dropdown" role="listbox">
			{#if placeholder}
				<button
					type="button"
					class="select-option placeholder-option"
					onclick={() => selectOption('')}
				>
					{placeholder}
				</button>
			{/if}
			{#each options as option (option.value)}
				<button
					type="button"
					class="select-option"
					class:selected={value === option.value}
					onclick={() => selectOption(option.value)}
					role="option"
					aria-selected={value === option.value}
				>
					<span class="option-label">{option.label}</span>
					{#if value === option.value}
						<Check class="option-check" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.custom-select {
		position: relative;
		width: 100%;
	}

	.select-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.625rem 2.25rem 0.625rem 0.875rem;
		border-radius: 0.5rem;
		background: white;
		font-size: 0.875rem;
		color: var(--color-gray-900);
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
		border: 1px solid #94a3b8;
	}

	:global(.dark) .select-trigger {
		background: var(--color-bg);
		color: var(--color-text);
	}

	.select-trigger.open {
		box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1);
	}

	:global(.dark) .select-trigger.open {
		box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
	}

	.select-value {
		flex: 1;
		pointer-events: none;
	}

	.select-value.placeholder {
		color: var(--color-gray-400);
	}

	:global(.dark) .select-value.placeholder {
		color: var(--color-gray-500);
	}

	.select-arrow-wrapper {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		transition: transform 0.3s ease;
	}

	.select-arrow {
		width: 18px;
		height: 18px;
		color: var(--color-gray-500);
	}

	:global(.dark) .select-arrow {
		color: var(--color-gray-400);
	}

	.select-arrow-wrapper.open {
		transform: translateY(-50%) rotate(180deg);
	}

	.select-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
		z-index: 1000;
		max-height: 240px;
		overflow-y: auto;
		animation: dropdownIn 0.2s ease-out;
		border: 1px solid #94a3b8;
	}

	:global(.dark) .select-dropdown {
		background: var(--color-bg-secondary);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
		border-color: rgba(255, 255, 255, 0.1);
	}

	@keyframes dropdownIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.select-option {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.625rem 0.875rem;
		border: none;
		background: transparent;
		font-size: 0.875rem;
		color: var(--color-gray-900);
		cursor: pointer;
		text-align: left;
		transition: all 0.2s ease;
	}

	.select-option:hover {
		background: var(--color-gray-50);
	}

	:global(.dark) .select-option:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.select-option.selected {
		background: rgba(30, 64, 175, 0.08);
		color: var(--color-primary);
	}

	:global(.dark) .select-option.selected {
		background: rgba(16, 185, 129, 0.1);
		color: var(--color-secondary);
	}

	.select-option.placeholder-option {
		color: var(--color-gray-400);
		font-style: italic;
	}

	:global(.dark) .select-option.placeholder-option {
		color: var(--color-gray-500);
	}

	.select-option:not(:last-child) {
		border-bottom: 1px solid var(--color-gray-100);
	}

	:global(.dark) .select-option:not(:last-child) {
		border-color: var(--color-gray-700);
	}

	.option-label {
		flex: 1;
	}

	.option-check {
		width: 18px;
		height: 18px;
		color: var(--color-primary);
	}

	:global(.dark) .option-check {
		color: var(--color-secondary);
	}

	/* Scrollbar styling for dropdown */
	.select-dropdown::-webkit-scrollbar {
		width: 6px;
	}

	.select-dropdown::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 3px;
	}

	:global(.dark) .select-dropdown::-webkit-scrollbar-track {
		background: var(--color-gray-700);
	}

	.select-dropdown::-webkit-scrollbar-thumb {
		background: var(--color-gray-300);
		border-radius: 4px;
	}

	:global(.dark) .select-dropdown::-webkit-scrollbar-thumb {
		background: var(--color-gray-600);
	}

	.select-dropdown::-webkit-scrollbar-thumb:hover {
		background: var(--color-gray-400);
	}

	:global(.dark) .select-dropdown::-webkit-scrollbar-thumb:hover {
		background: var(--color-gray-500);
	}
</style>
