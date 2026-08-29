<script lang="ts">
	import { ChevronLeft, ChevronRight, ChevronDown, Calendar } from '$lib/icons/lucide';
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		id?: string;
		value?: string;
		_required?: boolean;
		onchange?: (value: string) => void;
		class?: string;
	}

	let { id = '', value = '', _required = false, onchange, class: className = '' }: Props = $props();

	let isOpen = $state(false);
	let pickerRef: HTMLDivElement;

	const today = new Date();
	let currentMonth = $state(today.getMonth());
	let currentYear = $state(today.getFullYear());

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	let daysInMonth = $derived(getDaysInMonth(currentMonth, currentYear));
	let firstDayOfWeek = $derived(new Date(currentYear, currentMonth, 1).getDay());

	function getDaysInMonth(month: number, year: number): number {
		return new Date(year, month + 1, 0).getDate();
	}

	function formatDate(day: number): string {
		const month = (currentMonth + 1).toString().padStart(2, '0');
		const dayStr = day.toString().padStart(2, '0');
		return `${currentYear}-${month}-${dayStr}`;
	}

	function formatDisplayDate(dateStr: string): string {
		if (!dateStr) return '';
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function selectDay(day: number) {
		const newValue = formatDate(day);
		value = newValue;
		isOpen = false;
		if (onchange) onchange(newValue);
	}

	function prevMonth() {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
	}

	function nextMonth() {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
	}

	function goToToday() {
		const now = new Date();
		currentMonth = now.getMonth();
		currentYear = now.getFullYear();
		selectDay(now.getDate());
	}

	function handleClickOutside(event: MouseEvent) {
		if (pickerRef && !pickerRef.contains(event.target as Node)) {
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

	function getDayClass(day: number): string {
		const dateStr = formatDate(day);
		const isSelected = value === dateStr;
		const isToday = formatDate(day) === formatDate(today.getDate());
		return isSelected ? 'calendar-day selected' : isToday ? 'calendar-day today' : 'calendar-day';
	}
</script>

<div class="date-picker-wrapper {className}" bind:this={pickerRef}>
	<button
		type="button"
		{id}
		class="date-trigger"
		class:open={isOpen}
		class:has-value={value !== ''}
		onclick={() => (isOpen = !isOpen)}
		aria-expanded={isOpen}
		aria-haspopup="dialog"
	>
		<span class="date-icon-wrapper">
			<Calendar class="date-icon" />
		</span>
		<span class="date-value" class:placeholder={!value}>
			{value ? formatDisplayDate(value) : 'Select date'}
		</span>
		<span class="date-arrow-wrapper" class:open={isOpen}>
			<ChevronDown class="date-arrow" />
		</span>
	</button>

	{#if isOpen}
		<div class="date-dropdown" role="dialog" aria-label="Date picker">
			<div class="calendar-header">
				<button type="button" class="nav-btn" onclick={prevMonth} aria-label="Previous month">
					<ChevronLeft class="nav-icon" />
				</button>
				<span class="month-year">
					{monthNames[currentMonth]}
					{currentYear}
				</span>
				<button type="button" class="nav-btn" onclick={nextMonth} aria-label="Next month">
					<ChevronRight class="nav-icon" />
				</button>
			</div>

			<div class="calendar-weekdays">
				{#each dayNames as day (day)}
					<span class="weekday">{day}</span>
				{/each}
			</div>

			<div class="calendar-grid">
				{#each Array(firstDayOfWeek) as _, idx (idx)}
					<span class="calendar-day empty"></span>
				{/each}

				{#each Array(daysInMonth) as _, i (i)}
					{@const day = i + 1}
					<button type="button" class={getDayClass(day)} onclick={() => selectDay(day)}>
						{day}
					</button>
				{/each}
			</div>

			<div class="calendar-footer">
				<button type="button" class="today-btn" onclick={goToToday}> Today </button>
			</div>
		</div>
	{/if}
</div>

<style>
	.date-picker-wrapper {
		position: relative;
		width: 100%;
	}

	.date-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.625rem 2.5rem 0.625rem 0.875rem;
		border-radius: 0.5rem;
		background: white;
		font-size: 0.875rem;
		color: var(--color-gray-900);
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
		position: relative;
		border: 1px solid #94a3b8;
	}

	:global(.dark) .date-trigger {
		background: var(--color-bg);
		color: var(--color-text);
	}

	.date-trigger.open {
		box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1);
	}

	:global(.dark) .date-trigger.open {
		box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
	}

	.date-icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.date-icon {
		width: 18px;
		height: 18px;
		color: var(--color-gray-500);
	}

	:global(.dark) .date-icon {
		color: var(--color-gray-400);
	}

	.date-value {
		flex: 1;
	}

	.date-value.placeholder {
		color: var(--color-gray-400);
	}

	:global(.dark) .date-value.placeholder {
		color: var(--color-gray-500);
	}

	.date-arrow-wrapper {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
		pointer-events: none;
	}

	.date-arrow {
		width: 18px;
		height: 18px;
		color: var(--color-gray-500);
	}

	:global(.dark) .date-arrow {
		color: var(--color-gray-400);
	}

	.date-arrow-wrapper.open {
		transform: translateY(-50%) rotate(180deg);
	}

	.date-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
		z-index: 1000;
		padding: 0.5rem;
		animation: dropdownIn 0.2s ease-out;
		min-width: 220px;
		border: 1px solid #94a3b8;
	}

	:global(.dark) .date-dropdown {
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

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		background: transparent;
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--color-gray-600);
	}

	:global(.dark) .nav-btn {
		color: var(--color-gray-400);
	}

	.nav-btn:hover {
		background: var(--color-gray-100);
	}

	:global(.dark) .nav-btn:hover {
		background: var(--color-gray-700);
	}

	.nav-icon {
		width: 16px;
		height: 16px;
	}

	.month-year {
		font-weight: 600;
		color: var(--color-gray-900);
		font-size: 0.875rem;
	}

	:global(.dark) .month-year {
		color: white;
	}

	.calendar-weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
		margin-bottom: 0.25rem;
	}

	.weekday {
		text-align: center;
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--color-gray-500);
		padding: 0.25rem;
	}

	:global(.dark) .weekday {
		color: var(--color-gray-400);
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
	}

	.calendar-day {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		background: transparent;
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		color: var(--color-gray-700);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	:global(.dark) .calendar-day {
		color: var(--color-gray-300);
	}

	.calendar-day:hover:not(.empty) {
		background: var(--color-gray-100);
	}

	:global(.dark) .calendar-day:hover:not(.empty) {
		background: var(--color-gray-700);
	}

	.calendar-day.today {
		font-weight: 600;
		color: var(--color-primary);
	}

	:global(.dark) .calendar-day.today {
		color: var(--color-secondary);
	}

	.calendar-day.selected {
		background: var(--color-primary);
		color: white;
		font-weight: 600;
	}

	:global(.dark) .calendar-day.selected {
		background: var(--color-secondary);
	}

	.calendar-day.selected:hover {
		background: var(--color-primary);
	}

	:global(.dark) .calendar-day.selected:hover {
		background: var(--color-secondary);
	}

	.calendar-day.empty {
		cursor: default;
	}

	.calendar-footer {
		display: flex;
		justify-content: center;
		margin-top: 0.5rem;
		padding-top: 0.5rem;
	}

	.today-btn {
		padding: 0.375rem 0.75rem;
		background: transparent;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		color: var(--color-gray-600);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	:global(.dark) .today-btn {
		color: var(--color-gray-400);
	}

	.today-btn:hover {
		color: var(--color-primary);
		background: rgba(30, 64, 175, 0.05);
	}

	:global(.dark) .today-btn:hover {
		color: var(--color-secondary);
		background: rgba(16, 185, 129, 0.1);
	}
</style>
