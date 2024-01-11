const SingleAccordion = ({
    accordionHeaderTitle,
    accordionOptionsList,
  }: SingleAccordionType) => {
    const [accordionOptionsOpen, setAccordionOptionsOpen] = useState(false);
    const accordion_header_style = {
      borderRight: accordionOptionsOpen
        ? 4px solid #020e58
        : 4px solid transparent,
      backgroundColor: accordionOptionsOpen ? "#edf1ff" : "",
    };
    const accordion_title_style = {
      fontWeight: accordionOptionsOpen ? "700" : "400",
    };
  
    const queryParams = useSearchParams();
    const workspaceString = queryParams.get("workspace");
  
    return (
      <>
        <div className={styles.SingleAccordion}>
          <div
            className={styles.accordion_header}
            onClick={() => setAccordionOptionsOpen(!accordionOptionsOpen)}
            style={accordion_header_style}
          >
            <p style={accordion_title_style}>{accordionHeaderTitle}</p>
            <img
              src={
                accordionOptionsOpen
                  ? dropdown_icon_open.src
                  : dropdown_icon_closed.src
              }
              alt="dropdown icon"
              className={styles.dropdown_icon}
            />
          </div>
          {accordionOptionsOpen ? (
            <div className={styles.accordion_options_container}>
              {accordionOptionsList?.map((item) => {
                return (
                  <Link
                    href={${routePaths.DASHBOARD.WORKSPACE}?workspace=${item.workspaceID}}
                    className={
                      workspaceString === item.workspaceID
                        ? styles.navlink_item_active
                        : styles.navlink_item
                    }
                    key={item.workspaceID}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };