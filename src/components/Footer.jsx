
export default function Footer() {
	return (
		<footer className="bg-[#3b2418] pt-8 pb-2 text-white mt-16">
			<div className="lg:bg-white lg:text-[#3b2a23] flex justify-center items-center h-10 mb-2 relative lg:-top-8 px-2 sm:px-0">
				<div className="absolute left-0 w-1/6 sm:w-1/5 h-10 bg-[#3b2418]" />
				<span className="relative -top-2 z-10 px-2 sm:px-4 text-center w-full text-xs xs:text-sm md:text-base whitespace-nowrap overflow-x-auto">
					Follow Our Instagram : <span className="font-bold ">@glory.confectionery</span>
				</span>
				<div className="absolute right-0 w-1/6 sm:w-1/5 h-10 bg-[#3b2418]" />
			</div>

			<div className="max-w-6xl mx-auto px-2 xs:px-4 md:px-8 py-6 sm:py-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
					<div>
						<h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest mb-3 sm:mb-4">Opening Hours</h3>
						<p className="text-xs sm:text-sm leading-5 sm:leading-6">
							Mon-Sat: 9:00am to 7:00am<br />
							Sunday: 7:00am to 1:00pm<br />
							Close on Holidays
						</p>
					</div>
					<div>
						<h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest mb-3 sm:mb-4">Useful Links</h3>
						<ul className="text-xs sm:text-sm space-y-1">
							<li><a href="#" className="hover:underline">Wishlist</a></li>
							<li><a href="#" className="hover:underline">Privacy Policy</a></li>
							<li><a href="#" className="hover:underline">Order Tracking</a></li>
						</ul>
					</div>
					<div>
						<h3 className="uppercase text-xs sm:text-sm font-semibold tracking-widest mb-3 sm:mb-4">Address</h3>
						<p className="text-xs sm:text-sm leading-5 sm:leading-6">
							Maa Bhagwati Product , Gram Girwai , Lashkar , Gwalior<br />
							474001, India
						</p>
					</div>
				</div>
			</div>

			<div className="text-center text-[10px] xs:text-xs text-[#d1c5be] py-2 px-2">
				© 2026 Glory (Maa Bhagwati Product). All Right Reserved
			</div>
		</footer>
	);
}
