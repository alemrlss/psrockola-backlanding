const getBenefits = (membership) => {
  switch (membership.type) {
    case 10:
      return {
        sales: "1",
        skins: "1",
        customModePlay: false,
        type: "Basic",
      };
    case 20:
      return {
        sales: "3",
        skins: "3",
        customModePlay: false,
        type: "Plus",
      };
    case 30:
      return {
        sales: "5",
        skins: "5",
        customModePlay: true,
        type: "Premium",
      };
    default:
      return {};
  }
};

export default getBenefits;
