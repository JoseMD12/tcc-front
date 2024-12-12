import React from "react";
import SideBar from "../components/SideBar";

export default function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <SideBar>{children}</SideBar>;
}
