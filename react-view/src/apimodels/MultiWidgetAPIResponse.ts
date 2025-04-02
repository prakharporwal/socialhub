export interface MultiWidgetAPIResponse<T> {
    requestId: string;
    request: string;
    response: PageResponse<T>;
    session: UserSession;
}

export interface PageResponse<T> {
    pageData: string;
    pageMeta: string;
    slots: Slot<T>[]
}

export interface Slot<T> {
    type: string;
    view_type?: string;
    data: T
}

export interface UserSession {
    email: string;
}

export interface BaseWidgetDataModel {
    widgetData: string;
}