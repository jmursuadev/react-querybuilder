import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Command,
	CommandInput,
	Button,
	CommandList,
	CommandItem,
} from "@/components";
import { useShadCN } from "@/hooks/useShadCN";
import { cn } from "@/lib/utils";
import { ShadCNFieldSelectorProps } from "@/types";
import {
	CalendarIcon,
	ClockIcon,
	DotsVerticalIcon,
	LetterCaseCapitalizeIcon,
	PlusIcon,
	TimerIcon,
} from "@radix-ui/react-icons";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { CommandGroup } from "cmdk";
import { useMemo, useState } from "react";
import { FullField, getOption } from "react-querybuilder";

export const ShadCNFieldSelector = (allProps: ShadCNFieldSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [subPopoverOpen, setSubPopoverOpen] = useState(false);
	const [hoverField, setHoverField] = useState<FullField | null>(null);

	const {
		disabled,
		options,
		handleOnChange,
		testID,
		value,
		className,
		level,
		triggerElement: TriggerElement,
	} = allProps;
	const { recentField, setRecentField } = useShadCN();
	const valueOption = useMemo(() => getOption(options, value ?? ""), [options, value]);

	const renderIcon = (opt: any, size: number = 15) => {
		switch (opt.inputType) {
			case "datetime-local":
				return <CalendarIcon width={size} height={size} />;
			case "time":
				return <TimerIcon width={size} height={size} />;
			default:
				return <LetterCaseCapitalizeIcon width={size} height={size} />;
		}
	};

	const renderTrigger = () => {
		if (TriggerElement) {
			return <TriggerElement disabled={disabled} className={className} />;
		}

		return (
			<Button
				className="bg-input text-foreground min-w-content max-w-[300px] max-h-input hover:border-primary hover:border-input-placeholder hover:ring-1 hover:text-primary hover:!bg-input"
				disabled={disabled}
				data-testid={testID}
			>
				{value && valueOption ? valueOption.label : "Select a field"}
			</Button>
		);
	};

	if (level === 0) {
		return null;
	}

	return (
		<>
			<div>
				<Popover
					open={open}
					onOpenChange={(val) => {
						val ? setTimeout(() => setSubPopoverOpen(val), 50) : setSubPopoverOpen(val);
					}}
				>
					<PopoverTrigger asChild onClick={() => setOpen(true)}>
						{renderTrigger()}
					</PopoverTrigger>
					<PopoverContent
						className="p-0 w-full"
						side="bottom"
						align="start"
						onInteractOutside={() => setOpen(false)}
					>
						<Popover open={subPopoverOpen}>
							<PopoverAnchor className="p-3 pb-0">
								<div>
									<Command>
										<div className="flex items-center gap-3 mb-5 mx-1 my-1">
											<CommandInput placeholder="Search..."></CommandInput>
											<Button variant="ghost" className="gap-2 border-">
												<PlusIcon /> Create
											</Button>
										</div>
										<div className="flex">
											<div className="border-r border-outline pr-2">
												<ul>
													<li
														className={cn(
															"flex items-center gap-1 text-[12px] px-2 py-[8px] rounded-md min-w-[100px] leading-none font-bold",
															"hover:bg-primary-rgb-light hover:text-primary-rgb [&.active]:bg-primary-rgb-light [&.active]:text-primary-rgb",
															"active"
														)}
													>
														<LetterCaseCapitalizeIcon width={15} />{" "}
														<span className="leading-none">All</span>
													</li>
												</ul>
											</div>
											<div className="px-2">
												<div className="pl-2">
													<span className="text-[12px] text-foreground-gray mb-2 block">
														Recents
													</span>
													<span className="text-sm flex items-center leading-none gap-2">
														<LetterCaseCapitalizeIcon width={18} />{" "}
														{recentField && recentField.label}
													</span>
												</div>
												<hr className="border-outline my-3 ml-2" />
												<CommandList>
													<span className="text-[12px] text-foreground-gray pl-2">
														All Properties
													</span>
													<CommandGroup className="mb-2">
														{options.map((option: any) => (
															<CommandItem
																data-state-active={
																	option.value === value
																}
																key={option.value}
																value={option}
																className="text-sm data-[state-active=true]:bg-primary data-[state-active=true]:text-primary-foreground data-[selected=true]:bg-primary-rgb-light data-[selected=true]:text-primary gap-2 w-min-content max-w-[300px] rounded-md"
																onSelect={() => {
																	if (setRecentField) {
																		setRecentField(option);
																	}
																	handleOnChange(option.value);
																	setOpen(false);
																}}
																onMouseEnter={() =>
																	setHoverField(option)
																}
															>
																<span className="flex items-center gap-2 text-nowrap text-ellipsis line-clamp-1">
																	{renderIcon(option)}{" "}
																	{option.label}
																</span>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</div>
										</div>
									</Command>
								</div>
							</PopoverAnchor>
							<PopoverContent side="right" align="start" className="p-0">
								<div className="p-4 border-b border-outline">
									{hoverField && (
										<span className="flex gap-2 items-center text-sm mb-3">
											{renderIcon(hoverField, 20)}{" "}
											<span className="text-[#8f8f91] text-sm">User ▸</span>{" "}
											{hoverField.label}
										</span>
									)}
									<div className="content-body">
										{hoverField &&
											recentField &&
											recentField.value === hoverField.value && (
												<div className="recently-used bg-green-rgb/[0.1] text-green rounded-full p-1 text-[12px] flex items-center gap-1 mb-3">
													<ClockIcon />
													Recently used by you
												</div>
											)}
										<div className="description mb-3">
											<div className="description-content" slot="content">
												<div className="description-text-wrapper">
													<div className="description-text text-[12px] !font-normal text-gray-2">
														<span>
															Lorem Ipsum is simply dummy text of the
															printing and typesetting industry. Lorem
															Ipsum has been the industry&lsquo;s
															standard dummy text ever since the
															1500s, when an unknown printer took a
															galley of type and scrambled it to make
															a type specimen book. It has survived
															not only five centuries, but also the
															leap into electronic typesetting,
															remaining essentially unchanged. It was
															popularised in the 1960s with the
															release of Letraset sheets containing
															Lorem Ipsum passages, and more recently
															with desktop publishing software like
															Aldus PageMaker including versions of
															Lorem Ipsum.
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="detail-section flex flex-col text-[12px] text-gray-2">
											<div className="detail flex items-center gap-2">
												<div className="detail-name w-[60px] flex-shrink-0">
													Tracked as
												</div>
												<div className="detail-value">$distinct_id</div>
											</div>
											<div className="detail flex items-base gap-2">
												<div className="detail-name w-[60px] flex-shrink-0">
													Example
												</div>
												<div className="detail-value text-sm text-foreground">
													166424e227e7fb-0ff2f469b2f1fc-2d6a4f35
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="p-3 flex justify-end">
									<span>
										<DotsVerticalIcon />
									</span>
								</div>
							</PopoverContent>
						</Popover>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};
