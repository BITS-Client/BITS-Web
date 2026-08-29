<script lang="ts">
	import { Send, Cpu, Code, ShieldCheck, AlertCircle, CheckCircle } from '$lib/icons/lucide';
	import Turnstile from '$lib/components/ui/form/Turnstile.svelte';
	import CustomSelect from '$lib/components/ui/form/CustomSelect.svelte';
	import CustomDatePicker from '$lib/components/ui/form/CustomDatePicker.svelte';

	interface FormFieldOption {
		value: string;
		label: string;
	}

	interface InquiryType {
		value: string;
		label: string;
		icon: typeof Cpu;
		description: string;
		gradient: string;
		detailLabel?: string;
		detailPlaceholder?: string;
		detailItems?: FormFieldOption[];
	}

	interface ContactFormData {
		name: string;
		email: string;
		phone: string;
		inquiryType: string;
		consultationTopic: string;
		preferredDate: string;
		message: string;
	}

	interface Props {
		formTitle?: string;
		formSubtitle?: string;
		nameLabel?: string;
		namePlaceholder?: string;
		emailLabel?: string;
		emailPlaceholder?: string;
		phoneLabel?: string;
		phonePlaceholder?: string;
		typeLabel?: string;
		inquiryTypes?: InquiryType[];
		consultationTopicLabel?: string;
		consultationTopicPlaceholder?: string;
		messageLabel?: string;
		messagePlaceholder?: string;
		verificationLabel?: string;
		verifiedLabel?: string;
		turnstileRequiredLabel?: string;
		sendingLabel?: string;
		sendLabel?: string;
		successTitle?: string;
		successDesc?: string;
		errorTitle?: string;
		turnstileSiteKey?: string;
		locale?: string;
		onSubmit?: (data: ContactFormData, token: string) => Promise<void>;
	}

	let {
		formTitle = 'Get in Touch',
		formSubtitle = '',
		nameLabel = 'Name',
		namePlaceholder = 'Your name',
		emailLabel = 'Email',
		emailPlaceholder = 'your@email.com',
		phoneLabel = 'Phone',
		phonePlaceholder = '+62 812 3456 7890',
		typeLabel = 'Inquiry Type',
		inquiryTypes = [],
		consultationTopicLabel = 'Topic',
		consultationTopicPlaceholder = 'Select consultation topic',
		messageLabel = 'Message',
		messagePlaceholder = 'Tell us about your project...',
		verificationLabel = 'Verification',
		verifiedLabel = 'Verified',
		turnstileRequiredLabel = 'Please complete the verification',
		sendingLabel = 'Sending...',
		sendLabel = 'Send Message',
		successTitle = 'Message Sent!',
		successDesc = "Thank you for reaching out. We'll get back to you soon.",
		errorTitle = 'Error',
		turnstileSiteKey = '',
		locale: _locale = 'id',
		onSubmit
	}: Props = $props();

	// Form state
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		inquiryType: '',
		consultationTopic: '',
		preferredDate: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');
	let successTimerSet = $state(false);

	// Turnstile state
	let turnstileToken = $state('');
	let turnstileVerified = $state(false);
	let turnstileError = $state('');
	let turnstileComponent = $state<Turnstile | null>(null);

	// Theme and size detection
	let turnstileTheme = $state<'light' | 'dark' | 'auto'>('auto');
	let turnstileSize = $state<'normal' | 'compact'>('normal');

	const selectedInquiryType = $derived(
		inquiryTypes.find((type) => type.value === formData.inquiryType) || null
	);

	const selectedDetailItems = $derived(selectedInquiryType?.detailItems || []);
	const selectedDetailLabel = $derived(selectedInquiryType?.detailLabel || consultationTopicLabel);
	const selectedDetailPlaceholder = $derived(
		selectedInquiryType?.detailPlaceholder || consultationTopicPlaceholder
	);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const isDark = document.documentElement.classList.contains('dark');
			turnstileTheme = isDark ? 'dark' : 'light';

			const updateSize = () => {
				turnstileSize = window.innerWidth < 400 ? 'compact' : 'normal';
			};
			updateSize();
			window.addEventListener('resize', updateSize);
			return () => window.removeEventListener('resize', updateSize);
		}
	});

	function handleTurnstileVerify(token: string) {
		turnstileToken = token;
		turnstileVerified = true;
		turnstileError = '';
	}

	function handleTurnstileError(error?: string) {
		turnstileToken = '';
		turnstileVerified = false;
		turnstileError = error || '';
	}

	function handleTurnstileExpire() {
		turnstileToken = '';
		turnstileVerified = false;
		turnstileError = 'Verification expired. Please verify again.';
	}

	async function handleSubmitForm(event: Event) {
		event.preventDefault();

		if (!turnstileToken) {
			submitError = turnstileRequiredLabel;
			isSubmitting = false;
			return;
		}

		isSubmitting = true;
		submitError = '';

		try {
			if (onSubmit) {
				await onSubmit(formData, turnstileToken);
			}

			submitSuccess = true;

			// Reset form
			formData = {
				name: '',
				email: '',
				phone: '',
				inquiryType: '',
				consultationTopic: '',
				preferredDate: '',
				message: ''
			};

			// Reset Turnstile
			turnstileToken = '';
			turnstileVerified = false;
			if (turnstileComponent) {
				turnstileComponent.reset();
			}
		} catch (error) {
			submitError = error instanceof Error ? error.message : 'Something went wrong.';
			if (turnstileComponent) {
				turnstileComponent.reset();
			}
			turnstileToken = '';
			turnstileVerified = false;
		} finally {
			isSubmitting = false;
		}
	}

	// Auto-hide success message
	$effect(() => {
		if (submitSuccess && !successTimerSet) {
			successTimerSet = true;
			const timer = setTimeout(() => {
				submitSuccess = false;
				successTimerSet = false;
			}, 10000);
			return () => clearTimeout(timer);
		}
	});
</script>

<div class="form-container">
	<div class="form-header">
		<h2 class="form-title">{formTitle}</h2>
		{#if formSubtitle}
			<p class="form-subtitle">{formSubtitle}</p>
		{/if}
		<div class="form-header-underline"></div>
	</div>

	<form onsubmit={handleSubmitForm} class="contact-form">
		<!-- Basic Info -->
		<div class="form-grid">
			<div class="form-group">
				<label for="name" class="form-label">
					{nameLabel} <span class="required">*</span>
				</label>
				<input
					type="text"
					id="name"
					bind:value={formData.name}
					required
					class="form-input"
					placeholder={namePlaceholder}
				/>
			</div>
			<div class="form-group">
				<label for="email" class="form-label">
					{emailLabel} <span class="required">*</span>
				</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					required
					class="form-input"
					placeholder={emailPlaceholder}
				/>
			</div>
		</div>

		<div class="form-group">
			<label for="phone" class="form-label">
				{phoneLabel}
			</label>
			<input
				type="tel"
				id="phone"
				bind:value={formData.phone}
				class="form-input"
				placeholder={phonePlaceholder}
			/>
		</div>

		<!-- Inquiry Type Selection -->
		{#if inquiryTypes.length > 0}
			<div class="form-group">
				<label class="form-label" for="inquiry-type-select">
					{typeLabel} <span class="required">*</span>
				</label>
				<div class="inquiry-type-grid">
					{#each inquiryTypes as type (type.value)}
						<label
							class="inquiry-type-card {formData.inquiryType === type.value ? 'selected' : ''}"
							data-type={type.value}
						>
							<input
								type="radio"
								name="inquiryType"
								id={type.value === inquiryTypes[0]?.value ? 'inquiry-type-select' : undefined}
								value={type.value}
								bind:group={formData.inquiryType}
								required
								class="sr-only"
							/>
							<div class="inquiry-icon-wrapper">
								<div class="inquiry-icon bg-gradient-to-br {type.gradient}">
									<type.icon class="w-6 h-6" />
								</div>
							</div>
							<div class="inquiry-info">
								<span class="inquiry-label">{type.label}</span>
								<span class="inquiry-desc">{type.description}</span>
							</div>
							<div class="check-indicator">
								<CheckCircle class="w-5 h-5" />
							</div>
						</label>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Service-specific Detail Fields -->
		{#if formData.inquiryType && selectedDetailItems.length > 0}
			<div class="dynamic-fields">
				<h3 class="fields-title">
					<Code class="w-5 h-5" />
					{selectedDetailLabel}
				</h3>
				{#if formData.inquiryType === 'consultation'}
					<div class="form-grid">
						<div class="form-group">
							<CustomSelect
								id="consultationTopic"
								value={formData.consultationTopic}
								options={selectedDetailItems}
								placeholder={selectedDetailPlaceholder}
								onchange={(v) => (formData.consultationTopic = v)}
							/>
						</div>
						<div class="form-group">
							<CustomDatePicker
								id="preferredDate"
								value={formData.preferredDate}
								onchange={(v) => (formData.preferredDate = v)}
							/>
						</div>
					</div>
				{:else}
					<div class="form-group">
						<CustomSelect
							id="consultationTopic"
							value={formData.consultationTopic}
							options={selectedDetailItems}
							placeholder={selectedDetailPlaceholder}
							onchange={(v) => (formData.consultationTopic = v)}
						/>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Message -->
		<div class="form-group">
			<label for="message" class="form-label">
				{messageLabel} <span class="required">*</span>
			</label>
			<textarea
				id="message"
				bind:value={formData.message}
				required
				rows="5"
				class="form-textarea"
				placeholder={messagePlaceholder}
			></textarea>
		</div>

		<!-- Turnstile Verification -->
		{#if turnstileSiteKey}
			<div class="turnstile-section">
				<div class="turnstile-header">
					<ShieldCheck class="w-5 h-5 text-[var(--color-gray-500)]" />
					<span class="turnstile-label">{verificationLabel}</span>
				</div>
				<div
					class="turnstile-wrapper {turnstileVerified ? 'verified' : ''} {turnstileError
						? 'error'
						: ''}"
				>
					<Turnstile
						bind:this={turnstileComponent}
						sitekey={turnstileSiteKey}
						theme={turnstileTheme}
						size={turnstileSize}
						onVerify={handleTurnstileVerify}
						onError={handleTurnstileError}
						onExpire={handleTurnstileExpire}
					/>
					{#if turnstileVerified}
						<p class="turnstile-status verified">
							<ShieldCheck class="w-4 h-4" />
							{verifiedLabel}
						</p>
					{/if}
					{#if turnstileError}
						<p class="turnstile-status error">
							<AlertCircle class="w-4 h-4" />
							{turnstileError}
						</p>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Submit Button -->
		<div class="form-footer">
			<button type="submit" disabled={isSubmitting || !turnstileVerified} class="submit-btn">
				{#if isSubmitting}
					<span class="loading-spinner"></span>
					{sendingLabel}
				{:else}
					{sendLabel}
					<Send class="w-5 h-5" aria-hidden="true" />
				{/if}
			</button>
			{#if !turnstileVerified && !isSubmitting}
				<p class="verification-hint">{turnstileRequiredLabel}</p>
			{/if}

			{#if submitSuccess}
				<div class="success-message mt-4" role="alert">
					<div class="success-icon">
						<CheckCircle class="w-8 h-8" />
					</div>
					<h3 class="success-title">{successTitle}</h3>
					<p class="success-text">{successDesc}</p>
				</div>
			{/if}

			{#if submitError}
				<div class="error-message mt-4" role="alert">
					<AlertCircle class="w-5 h-5" />
					<div>
						<h3 class="error-title">{errorTitle}</h3>
						<p class="error-text">{submitError}</p>
					</div>
				</div>
			{/if}
		</div>
	</form>
</div>

<style>
	.form-container {
		background: white;
		border-radius: 1.5rem;
		padding: 0.75rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		border: 1px solid #94a3b8;
		width: 100%;
		max-width: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}

	:global(.dark) .form-container {
		background: var(--color-bg-secondary);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.1);
	}

	@media (min-width: 480px) {
		.form-container {
			padding: 1.25rem;
			box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
		}
	}

	@media (min-width: 640px) {
		.form-container {
			padding: 2rem;
			box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
		}
	}

	@media (min-width: 768px) {
		.form-container {
			padding: 2.5rem;
		}
	}
	.form-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		text-align: center;
	}

	.form-title {
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--color-gray-900);
		margin-bottom: 0.75rem;
		line-height: 1.2;
		background: linear-gradient(
			135deg,
			var(--color-gray-900) 0%,
			var(--color-primary) 50%,
			var(--color-secondary) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global(.dark) .form-title {
		background: linear-gradient(
			135deg,
			#ffffff 0%,
			var(--color-secondary) 50%,
			var(--color-primary) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
	}

	.form-subtitle {
		font-size: 1rem;
		color: var(--color-gray-600);
		line-height: 1.6;
		max-width: 90%;
		margin: 0 auto;
	}

	:global(.dark) .form-subtitle {
		color: var(--color-gray-400);
	}

	.form-header-underline {
		width: 80px;
		height: 4px;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		border-radius: 2px;
		margin: 1.25rem auto 0;
		position: relative;
		overflow: hidden;
	}

	.form-header-underline::after {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		100% {
			left: 100%;
		}
	}

	.success-message {
		text-align: center;
		padding: 1rem;
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%);
		border: 1px solid rgba(16, 185, 129, 0.3);
		border-radius: 1rem;
		margin-bottom: 2rem;
		animation: slideDown 0.4s ease-out;
	}

	@media (min-width: 640px) {
		.success-message {
			padding: 2rem;
		}
	}

	.success-icon {
		width: 60px;
		height: 60px;
		margin: 0 auto 1rem;
		border-radius: 50%;
		background: var(--color-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.success-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-secondary-dark);
		margin-bottom: 0.5rem;
	}

	.success-text {
		color: var(--color-gray-600);
	}

	.error-message {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.25rem;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 0.75rem;
		margin-bottom: 1.5rem;
		animation: shake 0.4s ease-out;
	}

	.error-message :global(svg) {
		color: #ef4444;
		flex-shrink: 0;
		margin-top: 0.125rem;
	}

	.error-title {
		font-weight: 600;
		color: #dc2626;
		margin-bottom: 0.25rem;
	}

	.error-text {
		font-size: 0.875rem;
		color: #991b1b;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.form-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}
		.form-grid-3 {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-gray-700);
	}

	:global(.dark) .form-label {
		color: white;
	}

	.required {
		color: #ef4444;
	}

	.form-input,
	.form-textarea {
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		padding: 0.625rem 0.875rem;
		border-radius: 0.5rem;
		background: white;
		font-size: 0.875rem;
		color: var(--color-gray-900);
		transition: all 0.3s ease;
		border: 1px solid #94a3b8;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1);
	}

	:global(.dark) .form-input,
	:global(.dark) .form-textarea {
		background: var(--color-bg);
		color: var(--color-text);
	}

	:global(.dark) .form-input:focus,
	:global(.dark) .form-textarea:focus {
		box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
	}

	.form-input::placeholder,
	.form-textarea::placeholder {
		color: var(--color-gray-400);
	}

	:global(.dark) .form-input::placeholder,
	:global(.dark) .form-textarea::placeholder {
		color: var(--color-gray-500);
	}

	.form-textarea {
		resize: none;
		min-height: 140px;
	}

	.inquiry-type-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.inquiry-type-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
		}
	}

	.inquiry-type-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		border-radius: 1.25rem;
		cursor: pointer;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		text-align: center;
		background: white;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		border: 1px solid #94a3b8;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	@media (min-width: 640px) {
		.inquiry-type-card {
			padding: 1.5rem 1rem;
		}
	}

	:global(.dark) .inquiry-type-card {
		background: var(--color-bg-secondary);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.inquiry-type-card[data-type='hardware']:hover {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
	}

	.inquiry-type-card[data-type='software']:hover {
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(168, 85, 247, 0.15);
	}

	.inquiry-type-card[data-type='consultation']:hover {
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%);
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
	}

	.inquiry-type-card[data-type='hardware'].selected {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
		box-shadow:
			0 4px 15px rgba(59, 130, 246, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	.inquiry-type-card[data-type='software'].selected {
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
		box-shadow:
			0 4px 15px rgba(168, 85, 247, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	.inquiry-type-card[data-type='consultation'].selected {
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);
		box-shadow:
			0 4px 15px rgba(16, 185, 129, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	.inquiry-icon-wrapper {
		position: relative;
	}

	.inquiry-icon {
		width: 60px;
		height: 60px;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	}

	.inquiry-type-card:hover .inquiry-icon {
		transform: scale(1.1) rotate(5deg);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.inquiry-type-card.selected .inquiry-icon {
		transform: scale(1.15);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
		animation: pulse-icon 2s ease-in-out infinite;
	}

	@keyframes pulse-icon {
		0%,
		100% {
			transform: scale(1.15);
		}
		50% {
			transform: scale(1.2);
		}
	}

	.inquiry-info {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 0.25rem;
	}

	.inquiry-label {
		font-weight: 600;
		color: var(--color-gray-900);
		font-size: 0.9375rem;
	}

	:global(.dark) .inquiry-label {
		color: white;
	}

	.inquiry-desc {
		font-size: 0.75rem;
		color: var(--color-gray-500);
	}

	:global(.dark) .inquiry-desc {
		color: #cbd5e1;
	}

	.check-indicator {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		color: var(--color-primary);
		opacity: 0;
		transform: scale(0.5);
		transition: all 0.3s ease;
	}

	.inquiry-type-card.selected .check-indicator {
		opacity: 1;
		transform: scale(1);
	}

	.dynamic-fields {
		padding: 1rem;
		background: var(--color-gray-50);
		border-radius: 1rem;
		animation: slideDown 0.3s ease-out;
		width: 100%;
		box-sizing: border-box;
	}

	@media (min-width: 640px) {
		.dynamic-fields {
			padding: 1.5rem;
		}
	}

	:global(.dark) .dynamic-fields {
		background: rgba(255, 255, 255, 0.02);
	}

	.fields-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-gray-900);
		margin-bottom: 1.25rem;
	}

	:global(.dark) .fields-title {
		color: white;
	}

	.fields-title :global(svg) {
		color: var(--color-primary);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.turnstile-section {
		padding: 0.75rem;
		background: var(--color-gray-50);
		border-radius: 1rem;
		width: 100%;
		box-sizing: border-box;
	}

	@media (min-width: 640px) {
		.turnstile-section {
			padding: 1.5rem;
		}
	}

	:global(.dark) .turnstile-section {
		background: rgba(255, 255, 255, 0.02);
	}

	.turnstile-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.turnstile-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-gray-700);
	}

	:global(.dark) .turnstile-label {
		color: white;
	}

	.turnstile-wrapper {
		padding: 0.5rem;
		border-radius: 0.75rem;
		transition: all 0.3s ease;
		display: block; /* Changed from flex to block for better scroll handling */
		width: 100%;
		overflow-x: auto;
		text-align: center;
	}

	.turnstile-wrapper :global(.turnstile-container) {
		display: inline-flex; /* Ensure content is centered but can scroll */
	}

	@media (min-width: 640px) {
		.turnstile-wrapper {
			padding: 1rem;
		}
	}

	.turnstile-wrapper.verified {
		background: rgba(16, 185, 129, 0.05);
	}

	.turnstile-wrapper.error {
		background: rgba(239, 68, 68, 0.05);
	}

	.turnstile-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.75rem;
		font-size: 0.875rem;
	}

	.turnstile-status.verified {
		color: var(--color-secondary);
	}

	.turnstile-status.error {
		color: #ef4444;
	}

	.form-footer {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
		color: white;
		font-weight: 600;
		font-size: 1rem;
		border: none;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.verification-hint {
		font-size: 0.875rem;
		color: var(--color-gray-500);
		text-align: center;
	}

	.loading-spinner {
		width: 20px;
		height: 20px;
		border: 2px solid transparent;
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
