/** @format */

import Button_SM from "../../ui/button";
import Container from "../container";
import { FaKey } from "react-icons/fa6";
import NavItems from "../../../constant/nav-items/index";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const NavBar = () => {
	return (
		<div>
			<div className='py-4 bg-ternary-color'>
				<Container>
					{/* buttons  */}
					<div className='flex items-center justify-end gap-4'>
						<Button_SM
							icon={FaKey}
							title={"Teacher Login"}
						/>
						<Button_SM
							icon={FaKey}
							title={"Guardian Login"}
						/>
					</div>
				</Container>
			</div>

			{/* nav items  */}
			<div>
				{/* nav container  */}
				<Container>
					<div className='flex items-center '>
						{NavItems.map((item, index) => {
							return (
								<div
									key={index}
									className=' relative group py-1 px-5'
								>
									{/* main link  */}
									{item.link ? (
										<Link className="font-semibold">{item.title}</Link>
									) : (
										<div className='cursor-pointer font-semibold'>
											{item.title}
										</div>
									)}

									{/* nested items  */}
									{item.nestedLink && (
										<div className='max-h-0  group-hover:max-h-[100vh] overflow-hidden group-hover:overflow-auto group-hover:translate-y-3 absolute bg-white -translate-x-5 mt-2 shadow-[0_0_3px_rgba(0,0,0,.5)]  duration-500 rounded'>
											<div className=' flex gap-5  transform '>
												{item.nestedLink.map(
													(nestedItem, index) => {
														return (
															<div
																key={index}
																className='w-[250px] py-4 px-6 rounded'
															>
																{nestedItem.title && <p className='text-secondary-color font-bold mb-2'>
																	{
																		nestedItem.title
																	}
																</p>}

																{/* inside links  */}
																<div className='flex flex-col gap-2 '>
																	{nestedItem.links.map(
																		(
																			nestedLinks,
																			index
																		) => {
																			return (
																				<div
																					key={
																						index
																					}
																				>
																					<Link
																						to={
																							nestedLinks.link
																						}
																					>
																						<div className='flex items-center gap-[2px] font-semibold hover:translate-x-2 duration-300 hover:text-primary-color'>
																							<MdKeyboardDoubleArrowRight />
																							{
																								nestedLinks.title
																							}
																						</div>
																					</Link>
																				</div>
																			);
																		}
																	)}
																</div>
															</div>
														);
													}
												)}
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</Container>
			</div>
		</div>
	);
};

export default NavBar;
