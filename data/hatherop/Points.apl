<ArcPad>
	<LAYER name="Points" quickcapture="false">
		<FORMS>
			<EDITFORM name="EDITFORM" caption="Points" width="130" height="80" picturepagevisible="true" attributespagevisible="false" symbologypagevisible="true" geographypagevisible="true">
				<PAGE name="PAGE1" caption="Point">
					<LABEL name="LABEL1" caption="Name" x="1" y="1" width="45" height="12" tooltip=""/>
					<EDIT name="NAME" field="NAME" x="47" y="1" width="82" height="12" border="true" tabstop="true" tooltip="" defaultvalue=""/>
					<LABEL name="LABEL2" caption="Category" x="1" y="14" width="45" height="12" tooltip=""/>
					<SYMBOLOGYFIELD name="CATEGORY" field="CATEGORY" x="47" y="14" width="82" height="12" border="true" tabstop="true" tooltip="" limittolist="false" defaultvalue=""/>
					<LABEL name="LABEL3" caption="Date" x="1" y="27" width="45" height="14" tooltip=""/>
					<DATETIME name="DATE" field="DATE" x="47" y="27" width="82" height="14" border="true" tabstop="true" allownulls="false" tooltip=""/>
					<LABEL name="LABEL4" caption="Comments" x="1" y="42" width="45" height="12" tooltip=""/>
					<EDIT name="COMMENTS" field="COMMENTS" x="47" y="42" width="82" height="36" border="true" tabstop="true" tooltip="" multiline="true" defaultvalue=""/>
				</PAGE>
				<PICTUREPAGE>
					<PICTUREFIELD field="Photo"/>
				</PICTUREPAGE>
			</EDITFORM>
		</FORMS>
		<METADATA>
			<COMMENTS>QuickProject : Points</COMMENTS>
		</METADATA>
		<HYPERLINK field="PHOTO" path=""/>
		<SYMBOLOGY>
			<SIMPLELABELRENDERER field="NAME" visible="true" rotationfield="" expression="" language="">
				<TEXTSYMBOL fontcolor="Black" font="MS Shell Dlg" fontstyle="regular" fontsize="8"/>
			</SIMPLELABELRENDERER>
			<VALUEMAPRENDERER lookupfield="Category">
				<EXACT value="1" label="Category 1" quickcapture="true" quickcapturelabel="Capture Category 1">
					<SIMPLEMARKERSYMBOL color="Red" width="5" outlinewidth="1"/>
				</EXACT>
				<EXACT value="2" label="Category 2" quickcapture="true" quickcapturelabel="Capture Category 2">
					<SIMPLEMARKERSYMBOL color="GreenYellow" width="5" type="square" outlinewidth="1"/>
				</EXACT>
				<EXACT value="3" label="Category 3" quickcapture="true" quickcapturelabel="Capture Category 3">
					<SIMPLEMARKERSYMBOL color="LightskyBlue" width="5" type="star" outlinewidth="1"/>
				</EXACT>
				<EXACT value="4" label="Category 4" quickcapture="false" quickcapturelabel="Capture Category 4">
					<SIMPLEMARKERSYMBOL color="Gold" width="5" type="triangle" outlinewidth="1"/>
				</EXACT>
				<EXACT value="5" label="Category 5" quickcapture="false" quickcapturelabel="Capture Category 5">
					<SIMPLEMARKERSYMBOL color="MediumOrchid" width="5" type="diamond" outlinewidth="1"/>
				</EXACT>
				<OTHER label="&lt;Other&gt;" quickcapture="false" quickcapturelabel="Capture &lt;Other&gt;">
					<SIMPLEMARKERSYMBOL width="5" type="x" outlinewidth="1"/>
				</OTHER>
			</VALUEMAPRENDERER>
		</SYMBOLOGY>
		<FIELDHISTORY>
			<FIELDS name="[3]">
				<FIELD name="CATEGORY" value="3"/>
				<FIELD name="COMMENTS" value=""/>
				<FIELD name="NAME" value="litter bin"/>
				<FIELD name="PHOTO" value=""/>
				<FIELD name="DATE"/>
			</FIELDS>
			<FIELDS name="[1]">
				<FIELD name="CATEGORY" value="1"/>
				<FIELD name="COMMENTS" value="brick"/>
				<FIELD name="NAME" value="pillar"/>
				<FIELD name="PHOTO" value=""/>
				<FIELD name="DATE"/>
			</FIELDS>
		</FIELDHISTORY>
		<QUERY where=""/>
	</LAYER>
</ArcPad>
