import * as React from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Dimension } from "../../../core/dependencies/LayoutProvider";
import BaseViewRenderer, { ViewRendererProps } from "../../../core/viewrenderer/BaseViewRenderer";

/***
 * View renderer is responsible for creating a container of size provided by LayoutProvider and render content inside it.
 * Also enforces a logic to prevent re renders. RecyclerListView keeps moving these ViewRendereres around using transforms to enable recycling.
 * View renderer will only update if its position, dimensions or given data changes. Make sure to have a relevant shouldComponentUpdate as well.
 * This is second of the two things recycler works on. Implemented both for web and react native.
 */
export default class ViewRenderer extends BaseViewRenderer<any> {
    private _dim: Dimension = {width: 0, height: 0};
    private _isFirstLayoutDone: boolean = false;

    constructor(props: ViewRendererProps<any>) {
        super(props);
        this._onLayout = this._onLayout.bind(this);
    }

    public shouldComponentUpdate(newProps: ViewRendererProps<any>): boolean {
        return (this.props.x !== newProps.x ||
            this.props.y !== newProps.y ||
            this.props.width !== newProps.width ||
            this.props.height !== newProps.height ||
            (this.props.dataHasChanged && this.props.dataHasChanged(this.props.data, newProps.data)));
    }

    public _onLayout(event: LayoutChangeEvent) {
        if (this.props.height !== event.nativeEvent.layout.height || this.props.width !== event.nativeEvent.layout.width) {
            this._dim.height = event.nativeEvent.layout.height;
            this._dim.width = event.nativeEvent.layout.width;
            if (this.props.onSizeChanged) {
                this.props.onSizeChanged(this._dim, this.props.index);
            }
        } else if (!this._isFirstLayoutDone) {
            this._isFirstLayoutDone = true;
            this.forceUpdate();
        }
        this._isFirstLayoutDone = true;
    }

    public render() {
        if (this.props.forceNonDeterministicRendering) {
            return (
                <View onLayout={this._onLayout}
                      style={{
                          flexDirection: this.props.isHorizontal ? "column" : "row",
                          left: this.props.x,
                          opacity: this._isFirstLayoutDone ? 1 : 0,
                          position: "absolute",
                          top: this.props.y,
                      }}>
                    {this.props.childRenderer(this.props.layoutType, this.props.data, this.props.index)}
                </View>
            );
        } else {
            return (
                <View
                      style={{
                          height: this.props.height,
                          left: 0,
                          position: "absolute",
                          top: 0,
                          transform: [{translateX: this.props.x}, {translateY: this.props.y}],
                          width: this.props.width,
                      }}>
                    {this.props.childRenderer(this.props.layoutType, this.props.data, this.props.index)}
                </View>
            );
        }
    }
}
