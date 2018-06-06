<ArcPad>
	<LAYER name="Lines" quickcapture="false">
		<FORMS>
			<EDITFORM name="EDITFORM" caption="Lines" width="130" height="80" picturepagevisible="true" attributespagevisible="false" symbologypagevisible="true" geographypagevisible="true">
				<PAGE name="PAGE1" caption="Line">
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
			<COMMENTS>QuickProject : Lines</COMMENTS>
		</METADATA>
		<HYPERLINK field="PHOTO" path=""/>
		<SYMBOLOGY>
			<SIMPLELABELRENDERER field="NAME" visible="true" rotationfield="" expression="" language="">
				<TEXTSYMBOL fontcolor="Black" font="MS Shell Dlg" fontstyle="regular" fontsize="8"/>
			</SIMPLELABELRENDERER>
			<VALUEMAPRENDERER lookupfield="Category">
				<EXACT value="1" label="Category 1" quickcapture="true" quickcapturelabel="Capture Category 1">
					<SIMPLELINESYMBOL color="Red" width="2"/>
				</EXACT>
				<EXACT value="2" label="Category 2" quickcapture="true" quickcapturelabel="Capture Category 2">
					<SIMPLELINESYMBOL color="ForestGreen" width="2"/>
				</EXACT>
				<EXACT value="3" label="Category 3" quickcapture="true" quickcapturelabel="Capture Category 3">
					<SIMPLELINESYMBOL color="DeepskyBlue" width="2"/>
				</EXACT>
				<EXACT value="4" label="Category 4" quickcapture="false" quickcapturelabel="Capture Category 4">
					<SIMPLELINESYMBOL color="Goldenrod" width="2"/>
				</EXACT>
				<EXACT value="5" label="Category 5" quickcapture="false" quickcapturelabel="Capture Category 5">
					<SIMPLELINESYMBOL color="MediumOrchid" width="2"/>
				</EXACT>
				<OTHER label="&lt;Other&gt;" quickcapture="false" quickcapturelabel="Capture &lt;Other&gt;">
					<SIMPLELINESYMBOL width="2"/>
				</OTHER>
			</VALUEMAPRENDERER>
		</SYMBOLOGY>
		<QUERY where=""/>
		<FIELDHISTORY>
			<FIELDS name="[2]">
				<FIELD name="CATEGORY" value="2"/>
				<FIELD name="COMMENTS" value="+ scrub and trees"/>
				<FIELD name="NAME" value="extent of unmaintained grass"/>
				<FIELD name="PHOTO" value=""/>
				<FIELD name="DATE"/>
			</FIELDS>
			<FIELDS name="[1]">
				<FIELD name="CATEGORY" value="1"/>
				<FIELD name="COMMENTS" value="feather edge 1.6m"/>
				<FIELD name="NAME" value="fence"/>
				<FIELD name="PHOTO" value=""/>
				<FIELD name="DATE"/>
			</FIELDS>
		</FIELDHISTORY>
	</LAYER>
</ArcPad>
