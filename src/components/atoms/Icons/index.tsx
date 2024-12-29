import { MouseEventHandler } from "react";
import "./Icons.scss";

interface IconProps {
	onClick?: MouseEventHandler<SVGElement>;
}

export const ChevronDown: React.FC<IconProps> = ({ onClick = () => {} }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className='custom-icon chevron-down-icon'
		onClick={onClick}>
		<path d='m6 9 6 6 6-6' />
	</svg>
);

export const ChevronUp: React.FC<IconProps> = ({ onClick = () => {} }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className='custom-icon chevron-up-icon'
		onClick={onClick}>
		<path d='m18 15-6-6-6 6' />
	</svg>
);

export const PlusMinus: React.FC<IconProps> = ({ onClick = () => {} }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className='custom-icon plus-minus-icon'
		onClick={onClick}>
		<path d='M12 3v14' />
		<path d='M5 10h14' />
		<path d='M5 21h14' />
	</svg>
);

export const Back: React.FC<IconProps> = ({ onClick = () => {} }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className='custom-icon back-icon'
		onClick={onClick}>
		<line
			x1='18'
			x2='18'
			y1='20'
			y2='4'
		/>
		<polygon points='14,20 4,12 14,4' />
	</svg>
);

export const X: React.FC<IconProps> = ({ onClick = () => {} }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className='custom-icon close-icon'
		onClick={onClick}>
		<path d='M18 6 6 18' />
		<path d='m6 6 12 12' />
	</svg>
);
