import groq from "groq";

export const IMAGE_QUERY = groq`
		crop {
			bottom,
			left,
			right,
			top
		},
		hotspot {
			height,
			width,
			x,
			y
		},
	asset->{
		_ref,
		_id,
		assetId,
		metadata {
			lqip,
		},
	}
`;

export const IMAGE_WITH_CAPTION_FRAGMENT = groq`
	_type,
	${IMAGE_QUERY},
	caption,
	alt
`;
const HEADING_WITH_SUBTITLE_FRAGMENT = groq`
	level,

	subtitle,
	_type,
	title,
	textAlign,
	_key
`;

export const RICH_TEXT_FRAGMENT = groq`
	_type == "richText" => {
		_type,
		content[] {
			...,

			_type == "person" => {
				"person": @-> {
					name,
					title,
					email,
					phone,
					bio,
					image

				}
			}
		},
		"excerpt": array::join(string::split((pt::text(content)), "")[0..100], "") + "...",

		_key
	}
`;

export const ACTION_FRAGMENT = groq`
	_type == "action" => {
		actionType,
		isExternal,
		actionStyle {
			color,
			buttonStyle
		},
		_type,
		_key,
		title,
		internalLink->{
			"slug":slug.current,
		}
	}

`;

export const TIME_ARRAY_FRAGMENT = groq`
	_type == "timeArray" => {
		_type,
		entry[] {
			day,
			_key,
			time
		}
	}
`;

export const UI_COMPONENT_FRAGMENT = groq`
	name,
	_type,
	_key
`;
export const PAGE_MODULES_QUERY = groq`

	_type,
	_key,
	_type == "hero" => {
		_type,
		_key,
		actions[] {
			${ACTION_FRAGMENT}

		},
		image {
			${IMAGE_QUERY}
		},
		heading {
			${HEADING_WITH_SUBTITLE_FRAGMENT}
		}
	},
	_type == "headingWithSubtitle" => {
		${HEADING_WITH_SUBTITLE_FRAGMENT}
	},
	${RICH_TEXT_FRAGMENT},
	_type == "galleryModule" => {
		_type,
		images[]{
			${IMAGE_WITH_CAPTION_FRAGMENT}
		},
		heading {
			${HEADING_WITH_SUBTITLE_FRAGMENT}
		}
	},
	_type == "textWithImageModule" => {
		heading {
			${HEADING_WITH_SUBTITLE_FRAGMENT}
		},
		imagePlacement,
		image {
			${IMAGE_WITH_CAPTION_FRAGMENT}
		},
		body {
			${RICH_TEXT_FRAGMENT}
		}
	},
	_type == "cardsModule" => {
		heading {
			${HEADING_WITH_SUBTITLE_FRAGMENT}
		},
		fullWidth,
		displayType,
		cards[]-> {
			_key,
			_type,
			title,
			"slug": slug.current,
			description{
				${RICH_TEXT_FRAGMENT}
			},
			mainImage {
				${IMAGE_QUERY}
			},
			photoGallery[] {
				${IMAGE_WITH_CAPTION_FRAGMENT}
			}

		}
	},
	_type == "calloutModule" => {
		backgroundColor,
		body,
		actions{
			actions[] {
				${ACTION_FRAGMENT}
			}
		}
	},
	_type == "columnsModule" => {
		_type,
		heading {
			${HEADING_WITH_SUBTITLE_FRAGMENT}
		},
		titleAlign,
		columns[] {
			_key,
			_type,
			items[] {
				_key,
				_type,
				_type == "headingWithSubtitle" => {
					${HEADING_WITH_SUBTITLE_FRAGMENT}
				},
				${RICH_TEXT_FRAGMENT},
				_type == "inlineGallery" => {
					images[] {
						${IMAGE_WITH_CAPTION_FRAGMENT}
					}
				},
				_type == "actions" => {
					actions[] {
						${ACTION_FRAGMENT}
					}
				},
				_type == "eventTimeWidget" => {
					title,
					showAddress,
					useDefaultServiceTimes,
					eventTimes[] {
						${TIME_ARRAY_FRAGMENT}
					},
					useDefaultAddress,
					eventLocation {
						streetAddress,
						city,
						state,
						zipcode
					}
				},
				_type == "uiComponentRef" => {
					${UI_COMPONENT_FRAGMENT}
				}
			}
		}
	},
	_type == "uiComponentRef" => {
		${UI_COMPONENT_FRAGMENT}
	}
`;

export const MINISTRY_QUERY = groq`
	*[_type == "ministry" && $slug == slug.current ][0]{
		_id,

		_type,
		title,
		"slug": slug.current,
		description{
			${RICH_TEXT_FRAGMENT}
		},
		mainImage {
			${IMAGE_QUERY}
		},
		photoGallery[] {
			_type,
			${IMAGE_WITH_CAPTION_FRAGMENT}
		}
	}
`;
export const ALL_MINISTRIES = groq`
	*[_type == "ministry"]{
		_id,
		_type,
		title,
	}
`;
export const SITE_CONFIG_QUERY = groq`
	*[_type == "siteConfig"][0]{
		title,
		url,
		address,
		phoneNumber,
		email,
		services {
			${TIME_ARRAY_FRAGMENT}
		},
		socialLinks[]{
			_key,
			platform,
			url
		},
		mainNavigation[]{
			_id,
			_key,
			itemName,
			externalLink,
			item->{
				_id,
				title,
				_type,
				"slug":slug.current
			},
			nestedRoutes[]{
				_key,
				itemName,
				externalLink,
				item->{
					_id,
					_type,
					title,
					"slug":slug.current
				}
			}
		},
		footerText
	}
`;

export const HOME_PAGE_QUERY = groq`
	*[_type == "home"][0]{
		title,
		pageLayouts {
			modules[_type != "hero"] {
				${PAGE_MODULES_QUERY}
			}
		}
	}
`;
export const PAGE_QUERY = groq`
	*[_type == "page" && $slug == route->slug.current][0]{
		title,
		_type,
			route-> {
		_id,
		title,
		"slug": slug.current,
		seo {
			metaTitle,
			metaDescription,
			ogTitle,
			ogDescription,
			ogImage {
				${IMAGE_QUERY}
			}
		}
	},
		pageLayouts {
			modules[] {
				${PAGE_MODULES_QUERY}
			}
		}
	}
`;
export const HOME_PAGE_QUERY_WITH_TYPE = groq`
	*[_type == "home"][0]{
		title,

		pageLayouts {

			modules[_type match $type] {
				${PAGE_MODULES_QUERY}
			}
		}
	}
`;
