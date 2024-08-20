import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CheckoutFormFieldProps {
	formLabel: string;
	form: any;
	formDescription?: string;
	formMessage?: string;
	placeholder?: string;
	name: string;
	value: string | number | undefined;
	className?: string;
	classNameFormLabel?: string;
}

const CheckoutFormField = ({
	formLabel,
	formDescription,
	form,
	name,
	value,
	className,
	classNameFormLabel,
}: CheckoutFormFieldProps) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='p-0.5'>
					<FormLabel className={cn('font-bold flex', classNameFormLabel)}>
						{formLabel}
						<span className='text-red-500'>:</span>
					</FormLabel>
					<FormControl>
						<Input
							className={cn('font-semibold flex', className)}
							placeholder='shadcn'
							{...field}
						/>
					</FormControl>
					<FormDescription>{formDescription}</FormDescription>
				</FormItem>
			)}
		/>
	);
};

export default CheckoutFormField;
