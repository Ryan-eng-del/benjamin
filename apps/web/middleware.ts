// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // import { match as matchLocale } from '@formatjs/intl-localematcher';
// // import Negotiator from 'negotiator';
// // function getLocale(request: NextRequest): string | undefined {
// // 	const locales: string[] = i18n.locales;
// // 	const headers: Record<string, string> = {};
// // 	request.headers.forEach((value, key) => (headers[key] = value));
// // 	const languages = new Negotiator({ headers }).languages(locales);
// // 	const locale = matchLocale(languages, locales, i18n.defaultLocale);
// // 	return locale;
// // }

// export function middleware(request: NextRequest) {
// 	const pathname = request.nextUrl.pathname;
// 	const searchParams = request.nextUrl.search;
// 	if (pathname.match(/\/pwa\/.*?\.png/)) {
// 		return;
// 	}
// 	if (['/manifest.json', '/favicon.ico', '/service-worker.js'].includes(pathname)) {
// 		return;
// 	}
// 	console.log('[MW]', pathname + searchParams);
// 	// /en/* -> /*
// 	if (pathname.startsWith(`/${i18n.defaultLocale}/`) || pathname === `/${i18n.defaultLocale}`) {
// 		const newPathname = pathname.replace(`/${i18n.defaultLocale}`, '');
// 		return NextResponse.redirect(new URL(newPathname + searchParams, request.url));
// 	}
// 	const pathnameIsMissingLocale = i18n.locales.every(
// 		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
// 	);

// 	if (pathnameIsMissingLocale) {
// 		return NextResponse.rewrite(
// 			new URL(`/${i18n.defaultLocale}${pathname}${searchParams}`, request.url),
// 		);
// 	}
// 	// if (pathnameIsMissingLocale) {
// 	// 	const locale = getLocale(request);
// 	// 	return NextResponse.redirect(
// 	// 		new URL(
// 	// 			`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}` + searchParams,
// 	// 			request.url,
// 	// 		),
// 	// 	);
// 	// }
// 	const requestHeaders = new Headers(request.headers);
// 	requestHeaders.set('x-url', request.url);
// 	requestHeaders.set('x-lang', pathname.split('/')?.[1]);
// 	return NextResponse.next({
// 		request: { headers: requestHeaders },
// 	});
// }
// export const config = {
// 	matcher: [
// 		'/((?!api|_next/static|_next/image|favicon.ico|/__nextjs_original-stack-frame|__nextjs_launch-editor).*)',
// 	],
// };
