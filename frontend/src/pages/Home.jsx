import React from 'react'

function Home() {
  return (
    <div className="space-y-12 dark:bg-gray-100 dark:text-gray-800">
	<section>
		<div className="container flex flex-col items-center px-4 py-8 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl">
			<h1 className="text-4xl font-bold leading-none sm:text-5xl">Quisquam necessita vel
				<span className="dark:text-violet-600">laborum doloribus</span>delectus
			</h1>
			<p className="px-8 mt-8 mb-12 text-lg">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
			<div className="flex flex-wrap justify-center">
				<button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Get started</button>
				<button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-900 dark:border-gray-300">Learn more</button>
			</div>
		</div>
	</section>
	<section className="p-6 dark:bg-gray-100 dark:text-gray-800">
		<div className="container grid justify-center grid-cols-2 mx-auto text-center lg:grid-cols-3">
			<div className="flex flex-col justify-start m-2 lg:m-6">
				<p className="text-4xl font-bold leading-none lg:text-6xl">50+</p>
				<p className="text-sm sm:text-base">Clients</p>
			</div>
			<div className="flex flex-col justify-start m-2 lg:m-6">
				<p className="text-4xl font-bold leading-none lg:text-6xl">89K</p>
				<p className="text-sm sm:text-base">Followers on social media</p>
			</div>
			<div className="flex flex-col justify-start m-2 lg:m-6">
				<p className="text-4xl font-bold leading-none lg:text-6xl">3</p>
				<p className="text-sm sm:text-base">Published books</p>
			</div>
			<div className="flex flex-col justify-start m-2 lg:m-6">
				<p className="text-4xl font-bold leading-none lg:text-6xl">8</p>
				<p className="text-sm sm:text-base">TED talks</p>
			</div>
			<div className="flex flex-col justify-start m-2 lg:m-6">
				<p className="text-4xl font-bold leading-none lg:text-6xl">22</p>
				<p className="text-sm sm:text-base">Years of experience</p>
			</div>
			<div className="flex flex-col justify-start m-2 lg:m-6">
				<p className="text-4xl font-bold leading-none lg:text-6xl">10+</p>
				<p className="text-sm sm:text-base">Workshops</p>
			</div>
		</div>
	</section>
	<section className="py-8">
		<div className="container mx-auto">
			<div className="p-4 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl">
				<h2 className="text-2xl font-bold leading-none sm:text-4xl">What can I offer to you?</h2>
				<p className="px-8 my-4">Graeco causae vim cu, alii option ancillae sea ut. Ad mea alii pertinax, ei sed falli ponderum adipisci. Vis iisque scripta cu. Sea ex mollis consulatu dissentiet, dicta viris volutpat mea an, et nec discere epicuri</p>
			</div>
			<div className="grid grid-cols-5 p-4 md:p-8">
				<div className="flex justify-center px-4 col-span-full md:col-span-1 md:flex-col md:justify-start md:items-start">
					<button className="p-2 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600">Mucius</button>
					<button className="px-2 py-1 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-violet-600 dark:text-gray-900">Fabellas</button>
					<button className="px-2 py-1 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600">Aperiam</button>
					<button className="px-2 py-1 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600">Nonumy</button>
					<button className="px-2 py-1 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600">Propriae</button>
				</div>
				<div className="grid gap-12 py-4 text-center sm:grid-cols-2 col-span-full md:col-span-4 md:text-left">
					<div className="flex flex-col items-center justify-center space-y-3 md:justify-start md:items-start">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:text-violet-600">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
						</svg>
						<h5 className="text-xl font-semibold">Est facilisis necessitatibus ea</h5>
						<p>Ex audiam inermis elaboraret eam, oratio petentium ne cum, mundi interesset sit no.</p>
					</div>
					<div className="flex flex-col items-center justify-center space-y-3 md:justify-start md:items-start">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:text-violet-600">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
						</svg>
						<h5 className="text-xl font-semibold">Vim iudico iisque te</h5>
						<p>At cibo possim impetus pro, ius id mutat commodo offendit. Cum inani pertinax definitiones ad.</p>
					</div>
					<div className="flex flex-col items-center justify-center space-y-3 md:justify-start md:items-start">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:text-violet-600">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
						</svg>
						<h5 className="text-xl font-semibold">Sea inani viris at</h5>
						<p>Et eos atomorum urbanitas accommodare, in suscipit petentium vis. Pro ea nibh praesent postulant.</p>
					</div>
					<div className="flex flex-col items-center justify-center space-y-3 md:justify-start md:items-start">
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:text-violet-600">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
						<h5 className="text-xl font-semibold">Error nihil primis sit ut</h5>
						<p>Eu vis urbanitas scripserit, civibus scripserit pro id. Omnes congue contentiones te eos.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section className="py-6 dark:bg-gray-100 dark:text-gray-900">
		<div className="container flex flex-col justify-center p-4 mx-auto space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
			<div className="flex flex-col space-y-4 text-center lg:text-left">
				<h1 className="text-5xl font-bold leading-none">Get free weekly tips</h1>
				<p className="text-lg">Subscribe to my weekly newsletter to find out about the latest and greatest news about just about everything!</p>
			</div>
			<div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
				<div className="flex flex-row">
					<input type="text" placeholder="example@email.com" className="w-3/5 p-3 rounded-l-lg sm:w-2/3" />
					<button type="button" className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-violet-600 dark:text-gray-50">Subscribe</button>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div className="container max-w-6xl p-6 space-y-6 sm:space-y-12">
			<a rel="noopener noreferrer" href="#" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
				<img src="https://source.unsplash.com/random/480x360" alt="Website Design System" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
				<div className="p-6 space-y-2 lg:col-span-5">
					<h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">Noster tincidunt reprimique ad pro</h3>
					<span className="text-xs dark:text-gray-600">February 19, 2021</span>
					<p>Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est in graece fuisset, eos affert putent doctus id.</p>
				</div>
			</a>
			<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
					<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?1" />
					<div className="p-6 space-y-2">
						<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
						<span className="text-xs dark:text-gray-600">January 21, 2021</span>
						<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
					</div>
				</a>
				<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
					<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?2" />
					<div className="p-6 space-y-2">
						<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
						<span className="text-xs dark:text-gray-600">January 22, 2021</span>
						<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
					</div>
				</a>
				<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
					<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?3" />
					<div className="p-6 space-y-2">
						<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
						<span className="text-xs dark:text-gray-600">January 23, 2021</span>
						<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
					</div>
				</a>
				<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 hidden sm:block">
					<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?4" />
					<div className="p-6 space-y-2">
						<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
						<span className="text-xs dark:text-gray-600">January 24, 2021</span>
						<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
					</div>
				</a>
				<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 hidden sm:block">
					<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?5" />
					<div className="p-6 space-y-2">
						<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
						<span className="text-xs dark:text-gray-600">January 25, 2021</span>
						<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
					</div>
				</a>
				<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 hidden sm:block">
					<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?6" />
					<div className="p-6 space-y-2">
						<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
						<span className="text-xs dark:text-gray-600">January 26, 2021</span>
						<p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
					</div>
				</a>
			</div>
			<div className="flex justify-center">
				<button className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600">Load more posts...</button>
			</div>
		</div>
	</section>
	<section>
		<div className="container px-6 py-12 mx-auto">
			<div className="grid items-center gap-4 xl:grid-cols-5">
				<div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
					<h2 className="text-4xl font-bold">Duo assum utroque appetere an</h2>
					<p className="dark:text-gray-600">Pri ex magna scaevola moderatius. Nullam accommodare no vix, est ei diceret alienum, et sit cetero malorum. Et sea iudico consequat, est sanctus adipisci ex.</p>
				</div>
				<div className="p-6 xl:col-span-3">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="grid content-center gap-4">
							<div className="p-6 rounded shadow-md dark:bg-gray-50">
								<p>An audire commodo habemus cum. Ne sed corrumpit repudiandae. Tota aliquip democritum pro in, nec democritum intellegam ne. Propriae volutpat dissentiet ea sit, nec at lorem inani tritani, an ius populo perfecto vituperatoribus. Eu cum case modus salutandi, ut eum vocent sensibus reprehendunt.</p>
								<div className="flex items-center mt-4 space-x-4">
									<img src="https://source.unsplash.com/51x51/?portrait" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
									<div>
										<p className="text-lg font-semibold">Leroy Jenkins</p>
										<p className="text-sm dark:text-gray-600">CTO of Company Co.</p>
									</div>
								</div>
							</div>
							<div className="p-6 rounded shadow-md dark:bg-gray-50">
								<p>Sit wisi sapientem ut, pri civibus temporibus voluptatibus et, ius cu hinc fabulas. Nam meliore minimum et, regione convenire cum id. Ex pro eros mucius consectetuer, pro magna nulla nonumy ne, eam putent iudicabit consulatu cu.</p>
								<div className="flex items-center mt-4 space-x-4">
									<img src="https://source.unsplash.com/52x52/?portrait" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
									<div>
										<p className="text-lg font-semibold">Leroy Jenkins</p>
										<p className="text-sm dark:text-gray-600">CTO of Company Co.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="grid content-center gap-4">
							<div className="p-6 rounded shadow-md dark:bg-gray-50">
								<p>Putant omnium elaboraret per ut. Id dicta tritani nominavi quo, mea id justo errem elaboraret. Agam mollis scripserit ea his, ut nec postea verear persecuti. Ea noster senserit eam, ferri omittantur ei nec. Id mel solet libris efficiantur, commune explicari et eos. Case movet ad est, sed tota vocent appetere ea.</p>
								<div className="flex items-center mt-4 space-x-4">
									<img src="https://source.unsplash.com/53x53/?portrait" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
									<div>
										<p className="text-lg font-semibold">Leroy Jenkins</p>
										<p className="text-sm dark:text-gray-600">CTO of Company Co.</p>
									</div>
								</div>
							</div>
							<div className="p-6 rounded shadow-md dark:bg-gray-50">
								<p>Te omnes virtute volutpat sed. Ei esse eros interesset vel, ei populo denique ocurreret vix, eu cum pertinax mandamus vituperatoribus. Solum nihil luptatum per ex, ei amet viderer eos. Ea illum labitur mnesarchum pro. Eius meis salutandi ei nam, alterum expetenda et nec. Expetenda intellegat at eum, per mazim sanctus honestatis ad. Ei noluisse invenire vix. Te ancillae patrioque qui, probo bonorum vivendum ex vim.</p>
								<div className="flex items-center mt-4 space-x-4">
									<img src="https://source.unsplash.com/54x54/?portrait" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
									<div>
										<p className="text-lg font-semibold">Leroy Jenkins</p>
										<p className="text-sm dark:text-gray-600">CTO of Company Co.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32">
		<div className="flex flex-col justify-between">
			<div className="space-y-2">
				<h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let's talk!</h2>
				<div className="dark:text-gray-600">Vivamus in nisl metus? Phasellus.</div>
			</div>
			<img src="assets/svg/doodle.svg" alt="Contact our customer support" className="p-6 h-52 md:h-64" />
		</div>
		<form noValidate="" className="space-y-6">
			<div>
				<label htmlFor="name" className="text-sm">Full name</label>
				<input id="name" type="text" placeholder="" className="w-full p-3 rounded dark:bg-gray-100" />
			</div>
			<div>
				<label htmlFor="email" className="text-sm">Email</label>
				<input id="email" type="email" className="w-full p-3 rounded dark:bg-gray-100" />
			</div>
			<div>
				<label htmlFor="message" className="text-sm">Message</label>
				<textarea id="message" rows="3" className="w-full p-3 rounded dark:bg-gray-100"></textarea>
			</div>
			<button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-violet-600 dark:text-gray-50">Send Message</button>
		</form>
	</div>
</div>
  )
}

export default Home