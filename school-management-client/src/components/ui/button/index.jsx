/** @format */

const Button_SM = ({ title, isUppercase, icon: Icon }) => {
	return (
		<button
			className={`py-[7px] px-4 bg-primary-color rounded sm-btn-hover-effect duration-500 font-bold flex items-center gap-2 ${
				isUppercase ? "uppercase" : "capitalize"
			} `}
		>
			{Icon && <Icon />}
			{title}
		</button>
	);
};

export default Button_SM;
