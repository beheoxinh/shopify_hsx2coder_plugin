import { ChevronDownIcon, ChevronUpIcon, IconsFilledIcon, PaintBrushFlatIcon, TextIcon } from "@shopify/polaris-icons";
import React, { Component } from 'react';
import "./style.scss";
import { Button, ButtonGroup, Text, Page, Card, Icon, Checkbox, FormLayout, Select, ColorPicker, TextField, hsbToHex, Tabs, LegacyCard } from "@shopify/polaris";

interface State {
	tab_index: number;
	focused: boolean;
	saveStatus: boolean;
	dataSource: any
}

export class SettingPage extends Component<{}, State> {
	constructor(props: {}) {
		super(props);

		this.state = {
			tab_index: 0,
			focused: true,
			saveStatus: false,
			dataSource: {
				isShowCalender: false,
				isReqDelivery: false,
				isAlwaysOpenCalendar: false,
				layout: '',
				calenderLayout: 'calender',
				themeColor: {
					hue: 300,
					brightness: 1,
					saturation: 0.7,
					alpha: 0.7,
				},
				titleColor: {
					hue: 200,
					brightness: 1,
					saturation: 0.5,
					alpha: 0.3,
				},
				messageColor: {
					hue: 0,
					brightness: 0,
					saturation: 0.0,
					alpha: 0.0,
				},
				deliveryDate: {
					title: '',
					deliveryDateLabel: '',
					deliveryDateTitle: '',
					deliveryTimeTitle: '',
					requiredMessageText: ''
				}
			}
		};
	}

	layoutOptions = [
		{label: 'Default', value: ''},
		{label: 'Dark Mode', value: 'dark'},
		{label: 'Light Mode', value: 'light'}
	]

	calenderLayoutOptions = [
		{label: 'Select one', value: ''},
		{label: 'Calender', value: 'calender'},
		{label: 'Simply', value: 'simply'},
	]

	calenderLanguageOptions = [
		{label: 'Default', value: ''},
		{label: 'English', value: 'english'},
		{label: 'Tiếng việt', value: 'vietnamese'},
	]

	firstDayOptions = [
		{label: 'Monday', value: 'monday'},
		{label: 'Sunday', value: 'sunday'}
	]

	dateFormatOptions = [
		{label: 'dd/mm/yyy', value: 'ddmmyyy'},
		{label: 'mm/dd/yyy', value: 'mmddyyy'}
	]

	tabs = [
		{
			id: 'panel1',
			content: 'Delivery Date',
			accessibilityLabel: 'All customers',
			panelID: 'content-1',
		},
		{
			id: 'panel2',
			content: 'Store Pickup',
			panelID: 'content-2',
		},
	];

	componentDidMount() {
		this.handleToggleClass = this.handleToggleClass.bind(this);
		const rightControls = document.querySelectorAll('.right-control');
		rightControls.forEach(rightControl => {
			rightControl.addEventListener('click', this.handleToggleClass);
		});
	}

	componentWillUnmount() {
		const rightControls = document.querySelectorAll('.right-control');
		rightControls.forEach(rightControl => {
			rightControl.removeEventListener('click', this.handleToggleClass);
		});
	}

	handleToggleClass(event: any) {
		var container = event.target.closest('.card-panel-container');
		container.classList.toggle('closed');
	}

	displayComponentTab = () => {
		const index = this.state.tab_index ?? 0;
		switch ( index ) {
			case undefined :
			case 0:
				return (<React.Fragment>
					<div className="card-content-container">
						<div className="row-panel-warp top-5">
							<TextField
								label="Tile"
								autoComplete="off"
								value={this.state.dataSource.deliveryDate.title}
								onChange={(value) => {
									this.setState(prevState => ({
										dataSource: {
											...prevState.dataSource, deliveryDate: {
												...prevState.dataSource.deliveryDate,
												title: value
											}}
									}));
								}}
							/>
						</div>
						<div className="row-panel-warp top-10">
							<TextField
								label="Delivery date label"
								autoComplete="off"
								value={this.state.dataSource.deliveryDate.deliveryDateLabel}
								onChange={(value) => {
									this.setState(prevState => ({
										dataSource: {
											...prevState.dataSource, deliveryDate: {
												...prevState.dataSource.deliveryDate,
												deliveryDateLabel: value
											}}
									}));
								}}
							/>
						</div>
						<div className="row-panel-warp top-10">
							<TextField
								label="Delivery date title"
								autoComplete="off"
								value={this.state.dataSource.deliveryDate.deliveryDateTitle}
								onChange={(value) => {
									this.setState(prevState => ({
										dataSource: {
											...prevState.dataSource, deliveryDate: {
												...prevState.dataSource.deliveryDate,
												deliveryDateTitle: value
											}}
									}));
								}}
							/>
						</div>
						<div className="row-panel-warp top-10">
							<TextField
								label="Delivery time title"
								autoComplete="off"
								value={this.state.dataSource.deliveryDate.deliveryTimeTitle}
								onChange={(value) => {
									this.setState(prevState => ({
										dataSource: {
											...prevState.dataSource, deliveryDate: {
												...prevState.dataSource.deliveryDate,
												deliveryTimeTitle: value
											}}
									}));
								}}
							/>
						</div>
						<div className="row-panel-warp">
							<TextField
								label="Required message text"
								autoComplete="off"
								value={this.state.dataSource.deliveryDate.requiredMessageText}
								onChange={(value) => {
									this.setState(prevState => ({
										dataSource: {
											...prevState.dataSource, deliveryDate: {
												...prevState.dataSource.deliveryDate,
												requiredMessageText: value
											}}
									}));
								}}
							/>
						</div>
					</div>
				</React.Fragment>)
			case 1 :
				return (<React.Fragment>
					<h3>Tab 2</h3>
				</React.Fragment>)
		}
	}

	render() {
		return (
			<Page>
				<div className={'page-header'}>
					<h3>{this.state.saveStatus ? 'Saved' : 'Unsaved'}</h3>
					<div className={'right-controller'}>
						<ButtonGroup>
							<Button variant="primary" size="large" onClick={() => {
								this.setState({saveStatus: false})
							}}>Discard</Button>
							<Button id={'save-button'} variant="primary" size="large" onClick={() => {
								this.setState({saveStatus: true})
							}}>Save</Button>
						</ButtonGroup>
					</div>
				</div>
				<div className={'page-wrapper'}>
					<div className={'page-title'}>
						<Text variant="headingMd" as="h6">
							Widget setting
						</Text>
					</div>
					<div className="page-content">
						<div className="card-panel-container">
							<Card>
								<div className={'card-title-container red-colored'}>
									<div className="left-side">
										<Icon source={IconsFilledIcon}/>
										<Text as={'span'}>Widget position</Text>
									</div>
									<div className="right-control">
										<span className="up-nav">
											<Icon source={ChevronUpIcon}></Icon>
										</span>
										<span className="down-nav">
											<Icon source={ChevronDownIcon}></Icon>
										</span>
									</div>
								</div>
								<div className="card-content-container">
									<div className="row-panel-warp">
										<Checkbox
											label="Show the calender at the product page"
											checked={this.state.dataSource?.isShowCalender}
											onChange={() => {
												this.setState(prevState => ({
													dataSource: {...prevState.dataSource, isShowCalender: !prevState.dataSource.isShowCalender}
												}));
											}}
										/>
									</div>
									<div className="row-panel-warp">
										<Checkbox
											label="Require the delivery date before checkout"
											checked={this.state.dataSource?.isReqDelivery}
											onChange={() => {
												this.setState(prevState => ({
													dataSource: {...prevState.dataSource, isReqDelivery: !prevState.dataSource.isReqDelivery}
												}));
											}}
										/>
									</div>
								</div>
							</Card>
						</div>

						<div className="card-panel-container">
							<Card>
								<div className={'card-title-container red-colored'}>
									<div className="left-side">
										<Icon source={PaintBrushFlatIcon}/>
										<Text as={'span'}>Widget Appearance</Text>
									</div>
									<div className="right-control">
										<span className="up-nav">
											<Icon source={ChevronUpIcon}></Icon>
										</span>
										<span className="down-nav">
											<Icon source={ChevronDownIcon}></Icon>
										</span>
									</div>
								</div>
								<div className="card-content-container">
									<FormLayout>
										<FormLayout.Group>
											<div className="row-panel-warp">
												<Select
													label="Layout"
													options={this.layoutOptions}
													value={this.state.dataSource?.layout}
													onChange={(value) => {
														this.setState(prevState => ({
															dataSource: {...prevState.dataSource, layout: value}
														}));
													}}
												/>
											</div>
											<div className="row-panel-warp">
												<Select
													label="Calender Layout"
													options={this.calenderLayoutOptions}
													value={this.state.dataSource?.calenderLayout}
													onChange={(value) => {
														this.setState(prevState => ({
															dataSource: {...prevState.dataSource, calenderLayout: value}
														}));
													}}

												/>
												<Checkbox
													label="Always open the calendar"
													checked={this.state.dataSource?.isAlwaysOpenCalendar}
													onChange={() => {
														this.setState(prevState => ({
															dataSource: {...prevState.dataSource, isAlwaysOpenCalendar: !prevState.dataSource.isAlwaysOpenCalendar}
														}));
													}}
												/>
											</div>
										</FormLayout.Group>
										<FormLayout.Group>
											<div className="row-panel-warp">
												<Select
													label="Calender Language"
													options={this.calenderLanguageOptions}
													value={this.state.dataSource?.calenderLanguage}
													onChange={(value) => {
														this.setState(prevState => ({
															dataSource: {...prevState.dataSource, calenderLanguage: value}
														}));
													}}
												/>
											</div>
											<div className="row-panel-warp">
												<Select
													label="First day of calender"
													options={this.firstDayOptions}
													value={this.state.dataSource?.firstDayOfCalender}
													onChange={(value) => {
														this.setState(prevState => ({
															dataSource: {...prevState.dataSource, firstDayOfCalender: value}
														}));
													}}
												/>
											</div>
										</FormLayout.Group>
										<FormLayout.Group>
											<div className="row-panel-warp">
												<Select
													label="Date format"
													options={this.dateFormatOptions}
													value={this.state.dataSource?.dateFormat}
													onChange={(value) => {
														this.setState(prevState => ({
															dataSource: {...prevState.dataSource, dateFormat: value}
														}));
													}}
												/>
											</div>
											<div className="row-panel-warp color-warp-input">
												<TextField
													label="Theme Color"
													placeholder="Select colors below to pick color"
													autoComplete="off"
													value={Object.keys(this.state.dataSource.themeColor).length ? hsbToHex(this.state.dataSource.themeColor) : ''}
													suffix={(<div className="color-lineout"
													              style={{backgroundColor: Object.keys(this.state.dataSource.themeColor).length ? hsbToHex(this.state.dataSource.themeColor) : 'transparent'}}
													              onClick={() => {
														              this.setState(prevState => ({
															              dataSource: {
																              ...prevState.dataSource,
																              themeColor: {...prevState.dataSource.themeColor, picked: !prevState.dataSource.themeColor.picked}
															              }
														              }));
													              }}
													></div>)}
												/>
											</div>
										</FormLayout.Group>
										{this.state.dataSource.themeColor.picked && <div className="row-panel-warp">
                                            <ColorPicker fullWidth onChange={(value) => {
												this.setState(prevState => ({
													dataSource: {...prevState.dataSource, themeColor: {...value, picked: true}}
												}));
											}} color={this.state.dataSource.themeColor}/>
                                        </div>}

										<FormLayout.Group>
											<div className="row-panel-warp color-warp-input">
												<TextField
													label="Title Color"
													placeholder="Select colors below to pick color"
													autoComplete="off"
													value={Object.keys(this.state.dataSource.titleColor).length ? hsbToHex(this.state.dataSource.titleColor) : ''}
													suffix={(<div className="color-lineout"
													              style={{backgroundColor: Object.keys(this.state.dataSource.titleColor).length ? hsbToHex(this.state.dataSource.titleColor) : 'transparent'}}
													              onClick={() => {
														              this.setState(prevState => ({
															              dataSource: {
																              ...prevState.dataSource,
																              messageColor: {...prevState.dataSource.messageColor, picked: false},
																              titleColor: {...prevState.dataSource.titleColor, picked: !prevState.dataSource.titleColor.picked}
															              }
														              }));
													              }}
													></div>)}
												/>
											</div>
											<div className="row-panel-warp color-warp-input">
												<TextField
													label="Required message text color"
													placeholder="Select colors below to pick color"
													autoComplete="off"
													value={Object.keys(this.state.dataSource.messageColor).length ? hsbToHex(this.state.dataSource.messageColor) : ''}
													suffix={(<div className="color-lineout"
													              style={{backgroundColor: Object.keys(this.state.dataSource.messageColor).length ? hsbToHex(this.state.dataSource.messageColor) : 'transparent'}}
													              onClick={() => {
														              this.setState(prevState => ({
															              dataSource: {
																              ...prevState.dataSource,
																              titleColor: {...prevState.dataSource.titleColor, picked: false},
																              messageColor: {
																	              ...prevState.dataSource.messageColor,
																	              picked: !prevState.dataSource.messageColor.picked
																              }
															              }
														              }));
													              }}
													></div>)}
												/>
											</div>
										</FormLayout.Group>
										{this.state.dataSource.titleColor.picked && <div className="row-panel-warp">
                                            <ColorPicker fullWidth onChange={(value) => {
												this.setState(prevState => ({
													dataSource: {...prevState.dataSource, titleColor: {...value, picked: true}}
												}));
											}} color={this.state.dataSource.titleColor}/>
                                        </div>}
										{this.state.dataSource.messageColor.picked && <div className="row-panel-warp">
                                            <ColorPicker fullWidth onChange={(value) => {
												this.setState(prevState => ({
													dataSource: {...prevState.dataSource, messageColor: {...value, picked: true}}
												}));
											}} color={this.state.dataSource.messageColor}/>
                                        </div>}
									</FormLayout>
								</div>
							</Card>
						</div>

						<div className="card-panel-container">
							<Card>
								<div className={'card-title-container red-colored'}>
									<div className="left-side">
										<Icon source={TextIcon}/>
										<Text as={'span'}>Widget text</Text>
									</div>
									<div className="right-control">
										<span className="up-nav">
											<Icon source={ChevronUpIcon}></Icon>
										</span>
										<span className="down-nav">
											<Icon source={ChevronDownIcon}></Icon>
										</span>
									</div>
								</div>
								<Tabs tabs={this.tabs} selected={this.state.tab_index} onSelect={(selected) => {
										this.setState(prevState => ({...prevState, tab_index: selected}));
									}} fitted>
                                        <LegacyCard.Section>
											{this.displayComponentTab()}
                                        </LegacyCard.Section>
                                    </Tabs>
							</Card>
						</div>
					</div>
				</div>
			</Page>
		);
	}
}
