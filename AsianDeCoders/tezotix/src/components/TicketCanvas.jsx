import React, { useEffect, useRef } from "react";
import ticketImg from "../assets/ticket.svg";

export default function TicketCanvas({ ticketDetails, setTicketUrl, height }) {
	const canvas = useRef(null);

	useEffect(() => {
		const ctx = canvas.current.getContext("2d");
		const dpi = window.devicePixelRatio;

		function fix_dpi() {
			const style = {
				height() {
					return +getComputedStyle(canvas.current)
						.getPropertyValue("height")
						.slice(0, -2);
				},
				width() {
					return +getComputedStyle(canvas.current)
						.getPropertyValue("width")
						.slice(0, -2);
				},
			};
			canvas.current?.setAttribute("width", style.width() * dpi);
			canvas.current?.setAttribute("height", style.height() * dpi);
		}

		const getW = (w) => {
			return (canvas.current?.width * w) / 200.5;
		};
		const getH = (h) => {
			return (canvas.current?.height * h) / 360;
		};

		var img = new Image();
		img.src = ticketImg;

		img.onload = function () {
			fix_dpi();
			ctx.drawImage(img, 0, 0, getW(200.5), getH(360));

			var poster = new Image();
			poster.src = ticketDetails.poster;
			poster.setAttribute("crossorigin", "anonymous");
			poster.onload = function () {
				ctx.drawImage(poster, getW(10), getH(10), getW(180), getH(124));
			};

			ctx.font = "700 " + getH(15) + "px poppins";
			ctx.textAlign = "center";
			ctx.fillStyle = "#22272E";
			ctx.fillText(
				ticketDetails.name.length >= 18
					? ticketDetails.name.slice(0, 18) + "..."
					: ticketDetails.name,
				getW(100.25),
				getH(159)
			);

			ctx.font = "500 " + getH(9) + "px poppins";
			ctx.textAlign = "center";
			ctx.fillStyle = "#22272E";
			ctx.fillText(ticketDetails.dateTime, getW(100.25), getH(175));

			ctx.font = "500 " + getH(10) + "px poppins";
			ctx.textAlign = "start";
			ctx.fillStyle = "#22272E";
			ctx.fillText(
				ticketDetails.theatre.length >= 25
					? ticketDetails.theatre.slice(0, 25) + "..."
					: ticketDetails.theatre,
				getW(34),
				getH(201.5)
			);

			ctx.font = "400 " + getH(10) + "px poppins";
			ctx.textAlign = "start";
			ctx.fillStyle = "#22272E";
			ctx.fillText(ticketDetails.screenNo, getW(60), getH(224));

			ctx.font = "400 " + getH(10) + "px poppins";
			ctx.textAlign = "start";
			ctx.fillStyle = "#22272E";
			ctx.fillText(ticketDetails.seats.join(", "), getW(53), getH(245));

			ctx.font = "400 " + getH(10) + "px poppins";
			ctx.textAlign = "start";
			ctx.fillStyle = "#22272E";
			ctx.fillText(ticketDetails.price + " ꜩ", getW(50), getH(266));

			var barcode = new Image();
			barcode.setAttribute("crossorigin", "anonymous");
			barcode.src =
				"https://barcode.orcascan.com/?type=code128&data=" +
				ticketDetails.barcodeData;

			barcode.onload = function () {
				ctx.drawImage(barcode, getW(24.5), getH(302), getW(150), getH(15.5));
				setTicketUrl(canvas.current.toDataURL());
			};

			ctx.font = "300 " + getH(5.5) + "px poppins";
			ctx.textAlign = "center";
			ctx.fillStyle = "#22272E";
			ctx.fillText(ticketDetails.barcodeData, getW(100.25), getH(323.5));
		};
	}, [ticketDetails]);

	return (
		<canvas
			ref={canvas}
			width="200.5px"
			height="360px"
			className="transition hover:scale-110"
			style={{ width: "calc(401 / 720 * " + height + ")", height: height }}
		>
			<p>Your Browser doesn't support HTML Canvas</p>
		</canvas>
	);
}
