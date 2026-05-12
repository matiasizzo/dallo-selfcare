-- Dall'Ó Selfcare — Product import from Shopify CSV
-- Run this in Supabase SQL editor

DO $$
DECLARE
  skin_cat_id uuid;
  nutri_cat_id uuid;
  pid uuid;
BEGIN

  SELECT id INTO skin_cat_id FROM categories WHERE slug = 'skin' LIMIT 1;
  SELECT id INTO nutri_cat_id FROM categories WHERE slug = 'nutri' LIMIT 1;

  IF skin_cat_id IS NULL THEN
    INSERT INTO categories (name, slug) VALUES ('Skin', 'skin') RETURNING id INTO skin_cat_id;
  END IF;
  IF nutri_cat_id IS NULL THEN
    INSERT INTO categories (name, slug) VALUES ('Nutri', 'nutri') RETURNING id INTO nutri_cat_id;
  END IF;

  -- D-EVENGLOW SERUM
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-EVENGLOW SERUM',
    'd-evenglow-serum',
    'Descripción 

D-EVENGLOW Serum es el despertador celular definitivo que fusiona Vitamina C pura, PDRN y Ácido Tranexámico para reprogramar la piel desde el interior. Su fórmula biotecnológica de alta potencia revierte el daño solar, ayuda a difuminar manchas rebeldes y restaura una luminosidad  perdida. Es el elixir nocturno esencial para quienes buscan un tono uniforme.

Tamaño

20 ml
Textura
Fluido ligero y sedoso, de absorción inmediata sin dejar residuo graso.

Aroma

Sutil fragancia cítrica y fresca (Citrus Reticulata), diseñada para una experiencia relajante durante la rutina nocturna.

Indicaciones y consejos Dr. Dall’O:

Ideal para todo tipo de pieles, especialmente aquellas con manchas (hiperpigmentación), foto-envejecidas o en recuperación post-procedimientos dermatológicos.

Modo de Uso y Dosificación

Consejos Dr. Dall’O

Para obtener resultados óptimos, siga el protocolo de aplicación:

Cuándo: Uso exclusivo por la noche.

Dosificación: Aplicar 10 gotas exactas.

Zona: Rostro, cuello y escote y dorsos de la  manos.

Técnica: Realizar un suave masaje ascendente hasta su total absorción.

INGREDIENTS: AQUA (OZONIZED), GLYCERIN, ASCORBIC ACID, NIACINAMIDE, TRANEXAMIC ACID, GLUTATHIONE, SODIUM HYALURONATE, DNA (PDRN), CITRUS RETICULATA PEEL EXTRACT, HYDROXYETHYLCELLULOSE, POLYSORBATE 20, PHENOXYETHANOL, ETHYLHEXYLGLYCERIN, BHT, PARFUM.

Restricciones

NO combinar con Retinol en la misma rutina nocturna.

Recomendación

En pieles sensibles o bajo tratamiento médico, seguir la orientación de su especialista.

Conservación

Debido a la pureza de sus activos (especialmente la Vitamina C):

Almacenamiento: Mantener en un lugar fresco, seco y estrictamente protegido de la luz directa.

Consumo y caducidad 

Utilizar preferentemente dentro de los *3 meses* posteriores a su apertura para garantizar la máxima eficacia de la fórmula.

"La Vitamina C pura puede cambiar ligeramente de color con el tiempo; esto es normal debido a su naturaleza activa y no compromete la seguridad del producto dentro de su periodo de uso recomendado."

Testado  por médicos estéticos  | Libre de parabenos | No testeado en animales

Dall’O: Skin Longevity Science.

¿Por qué 20 mL?

Porque la verdadera eficacia no necesita volumen, sino frescura. En Dall’O SKIN, eliminamos los stocks eternos. Cada unidad se formula cuando tú la pides, asegurando q llegue  a tu puerta con su estructura molecular intacta.',
    skin_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/IMG_0548_1.png?v=1777983425',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-Senolytic
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-Senolytic',
    'd-senolytic-1',
    'D-Senolytic serum auxilia en  combate de  la senescencia celular. Su fórmula sinérgica con Péptidos  GHK-Cu, PDRN, Resveratrol e Ácido Hialurónico actúa como un arquitecto dérmico, restaurando la densidad y protegiendo la integridad de la barrera cutánea. Piel visiblemente más firme, elástica y revitalizada.

Modo de uso

Aplicar sobre la piel limpia y tonificada.

Realizar un suave masaje ascendente hasta su total absorción.

Frecuencia: De tres a cuatro veces por semana, de día o de noche.

Consejo Dr. Dall’O:

Si se usa de día, completar siempre con protección solar. Evitar el uso en la misma rutina con productos que contengan Vitamina C pura (ácido ascórbico) o ácidos fuertes (AHA/BHA).

Dosificación:

Debido a su alta concentración de activos, aplicar de 4 a 8 gotas es suficiente para cubrir rostro, cuello y escote.

Experiencia sensorial

Textura: Fluido ligero con tecnología Silk-Touch. Se absorbe al instante dejando un acabado satinado, sin residuo graso.

Aroma: Una salida cítrica de mandarina mediterránea que evoluciona hacia notas cálidas y reconfortantes.

Cosumo caducidad

Frescura garantizada: Producto elaborado bajo pedido.

Vida útil: Consumir preferentemente en un plazo máximo de 3 meses tras su apertura para garantizar la estabilidad del NAD⁺ y los péptidos.

Conservación

Mantener el envase cerrado, en un lugar fresco (idealmente por debajo de 25°C), seco y estrictamente alejado de la luz solar directa.

Ingredients:Aqua, Sodium Hyaluronate, Copper Tripeptide-1, Polydeoxyribonucleotide, Nicotinamide Adenine Dinucleotide, Vitis Vinifera Fruit Extract, Ethylhexyl Stearate, Squalane, Glycerin, Citrus Reticulata Peel Oil, Leuconostoc/Radish Root Ferment Filtrate, Parfum, Limonene, Linalool.Componentes naturales presentes en el aceite esencial de mandarina y el perfume.

Precauciones

Uso externo exclusivamente. Evitar el contacto directo con ojos y mucosas. En caso de contacto, aclarar con abundante agua. Si aparece irritación, suspender su uso y consultar a un especialista. Mantener fuera del alcance de los niños.

Testado  por médicos estéticos  | Libre de parabenos | No testeado en animales

Dall’O: Skin Longevity Science.

¿Por qué 20 mL?

Porque la verdadera eficacia no necesita volumen, sino frescura. En Dall’O SKIN, eliminamos los stocks eternos. Cada unidad se formula cuando tú la pides, asegurando que  llegue a tu puerta con su estructura molecular intacta.',
    skin_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/IMG_0500_1.png?v=1777982894',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-Purifying
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-Purifying',
    'd-purifying-2',
    'Descripción

El Sérum Facial D-Purifying es un concentrado de alta precisión diseñado para equilibrar, purificar y restaurar la vitalidad de la piel mixta a grasa. Su acción reguladora de la Niacinamida con el poder exfoliante del Ácido Salicílico, logrando con poros menos visibles y Ácido Hialurónico y al Aceite de Geranio, el rostro mantiene su hidratación óptima y su microbiota equilibrada, proporcionando una sensación de frescor inmediato sin dejar residuo graso.

Tamaño

20 ml

Textura 

Gel ligero de rápida absorción.

Aroma

Fresco y cítrico con notas herbales.
Indicaciones

Piel mixta a grasa / Tendencia acneica.

Aplicación 

Mañana y noche sobre la piel limpia y ligeramente humedecida.

Dosificación 

Aplicar de 6 a 8 gotas (ajustado para 20ml) sobre rostro y cuello, extendiendo con movimientos ascendentes hasta su total absorción.

Cosumo y caducidad

Fórmula magistral preparada bajo pedido. Se recomienda su uso dentro de los 3 meses posteriores a su apertura debido a la frescura de sus activos botánicos.

Almacenamiento

Mantener en un lugar fresco, seco y protegido de la luz solar directa.

Ingredientes (INCI Name) :Aqua, Niacinamide, Sodium Hyaluronate, Salicylic Acid, Pelargonium Graveolens Flower Oil, Citrus Limon Peel Oil, Citrus Paradisi Peel Oil, Cymbopogon Citratus Leaf Oil, Leuconostoc/Radish Root Ferment Filtrate, Parfum.

Precauciones

Solo uso externo. Evitar el contacto con ojos y mucosas. En caso de irritación, suspenda su uso y consulte a su médico.

Testado  por médicos estéticos  | Libre de parabenos | No testeado en animales

Dall’O: Skin Longevity Science.

¿Por qué 20 mL?

Porque la verdadera eficacia no necesita volumen, sino frescura. En Dall’O SKIN, eliminamos los stocks eternos. Cada unidad se formula cuando tú la pides, asegurando q llegue  a tu puerta con su estructura molecular intacta.',
    skin_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/IMG_0493_1.png?v=1777982727',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D- Purifying Sérum
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D- Purifying Sérum',
    'd-purifying-1',
    'Tamanho: 30ml

El Sérum Facial D-Purifying combina ácido hialurônico, niacinamida (vitamina B3), NAD (dinucleótido de adenina e nicotinamida), óleo de gerânio não comedogênico e ácido salicílico em uma fórmula personalizada. Sua ação proporciona uma agradável sensação de frescor e equilíbrio, especialmente projetada para pele misturada com gordura. Hidrata em profundidade, ajuda a preservar o microbioma natural da pele e promove seu equilíbrio e resistência, sem obstruir os poros.

Indicações para:  Piel mixta a grasa

Modo de uso:  Durante a manhã e a noite, aplique sobre o rosto e o rosto umedecidos e deixe agir.

Dosagem:  10 gotas

Textura:  Gel.

Aroma:  Fresco e frio. 

Caducidad:  A fórmula é preparada sob pedido para manter sua qualidade e eficácia. Devido ao fato de conter ingredientes com baixa estabilidade ambiental, recomenda-se utilizá-la dentro dos 3 meses posteriores à sua abertura.

Conservação: Conservar em local fresco, seco e afastado da luz direta.

Precauções: Uso externo, evite o contato direto com os olhos e em caso de irritação suspenda o uso.

Ingredientes (INCI):  Água, Niacinamida (Vitamina B3), Hialuronato de Sódio, Adenina Dinucleotídeo (NAD), Ácido Salicílico, Óleo da Flor de Pelargonium Graveolens, Óleo da Casca de Citrus Limon, Óleo da Casca de Citrus Paradisi, Óleo da Folha de Cymbopogon Citratus, Filtrado de Fermento de Raiz de Rabanete/Leuconostoc, Perfume (Fragrância)

 Dermatologicamente provado | Livre de parabenos | Não testado em animais

Ativos-chave:

• Ácido hialurônico: hidrata e suaviza a pele. 
• Niacinamida (vitamina B3): Regula o sebo e melhora a luminosidade. 
• NAD (Dinucleótido de Adenina): Estimula o metabolismo celular. 
• Ácido salicílico: esfolia suavemente e previne imperfeições. 
• Aceite de gerânio: não comedogênico: equilíbrio e calma.',
    skin_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/WhatsAppImage2025-08-15at13.11.15_de35e83f-3c4d-42a7-8613-191e550a2ad2.jpg?v=1755819076',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 5785, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D- Purifying Mousse
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D- Purifying Mousse',
    'd-purifying',
    'Tamanho: 150 mL/ 5,07 FL. Oz.

É uma mousse que limpa e elimina as impurezas e protege a microbiota da pele, oferece uma sensação suave de frescor, formulada à base de óleos vegetais Ozonizados e Aceite Geranio (não comedogênicos), Ácido salicílico e vitamina B3 Niacinamida.

Indicações para:  Todos os tipos de pele e gordura 

parabenostes maestros:  Aceite Ozonizado e Aceite Geranio, ácidos: salicílico, láctico e vitamina B3 (niacinamida)

Modo de uso:  Para a manhã e a noite, faça espuma e massageie o rosto e o rosto umedecidos e deixe agir por um ou dois minutos, enjuagar bem com água tíbia. 

Dosificação:  Media cucharadita

Textura:  Crema gel Mousse levemente espumoso. 
Tenemos formato de espuma. 

Aroma:  Fresco e frio. 

Observação:  A fórmula foi elaborada sob pedido para preservar a qualidade e a eficácia. Para conter os ativos de baixa estabilidade ambiental, recomenda-se seu uso imediato além da abertura máxima em 6 meses. 

Conservação: Conservar em local fresco, seco e afastado da luz direta.

Ingredientes (INCI): Água, Óleo de Olea Europaea (Oliva) Ozonizado, Óleo de Pelargonium Graveolens, Lauril Éter Sulfato de Sódio, Copolímero de Acrilatos, Cloreto de Sódio, Ácido Lático, Niacinamida (Vitamina B3), Cocamidopropil Betaína, Benzoato de Sódio, Sorbato de Potássio, Diestearato de Glicol, Cocamida MEA, EDTA Tetrassódico, Perfume (Fragrância)

Testado médicos estéticos | Sem parabenos | Livre de crueldade',
    skin_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/IMG_0507_2.png?v=1777982974',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D- Longevity Mousse
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D- Longevity Mousse',
    'd-longevity',
    'Tamaño: 150 mL/ 5.07 FL. Oz.

Este mousse limpia a profundidad y protege la barrera cutánea, formulado con aceites vegetales ozonizados, rosa mosqueta, ácidos glicólicos y láctico, además de vitaminas B5 y B12, brindando al rostro un cuidado completo y delicado.

Indicaciones para: Todos tipo de piel  a  sensibles

Ingredientes maestros: Aceite Ozonizado y rosa mosqueta  , ácidos glicólico,  láctico, vitaminas,   B5  y  B12

Modo de uso: Por la mañana y noche, haga espuma y masajear sobre el rostro y el cuello humedecidos y dejar actuar durante uno o dos minutos, enjuagar bien con agua tibia. 

Dosificación: Media cucharadita

Textura: Crema gel Mousse ligeramente espumoso. 

Aroma: Cálido y fresco

Ingredients: Aqua, Ozonized Olive Oil,Sodium Laureth Sulfate, Acrylates Copolymer, Sodium Chloride, Glycolic Acid ,Lactic Acid, Tocofpheryl acetado, limone , Vitamin B12, Depantenol , rosehip oil ,Coca midopropyl Betaine, Socum Bezat, Potassium Sorbate, Glycal Distearate Parfum, Cocamide MEA, Tetasodium EDTA ,parfum.

Caducidad: Fórmula elaborada bajo pedido para garantizar calidad y eficacia. Tras su apertura, se recomienda usar en un máximo de 5 meses debido a la baja estabilidad de los activos.

Conservación: Para conservar el producto en óptimas condiciones, guárdalo en un lugar fresco, seco y protegido de la luz directa.

Dermatologicamente probado | Libre de parabenos | No testeado en animales',
    skin_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/IMG_0517_1.png?v=1777983185',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-AOX
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-AOX',
    'd-aox',
    'Tamaño: 20 mL

Restorative Night Treatment Oil

Es un blend  de aceites naturales enriquecidos con Vitamina E, Resveratrol, Ubiquinona-Q10, Rosa Mosqueta y Nicotinamida adenina dinucleótido (NAD+).

Acción: Estos activos promove la producción de ceramidas y del factor hidratante natural (NMF), restauran la barrera cutánea, y reducen inflamación y estrés oxidativo, incluso en pieles atópicas o trás procedimentos dermatológicos.

Indicaciones: Todo tipo de piel a sensibles y post procedimientos dermatológicos con indicación médica.

Modo de uso: Tres a cuatro veces por semana, masajear sobre la piel recién limpia y tonificada.

Dosificación: De cinco a diez gotas.

Textura: Aceite nutritivo y absorbente.

Aroma: Cítrico y cálido.

Ingredients: Tocopheryl Acetate, Ethylhexyl Stearate ,Oryza Sativa Bran Oil,Rosa Canina Fruit Oil (Rosehip Oil),Olea Europaea Fruit Oil, Nicotinamide Adenine Dinucleotide-NAD , Vitis vinifera extract, (resveratrol),Squalane,Oryzanol,Ubiquinone Q10,Citrus Reticulata (Tangerine) Extract,Parfum

Caducidad: Esta fórmula se elabora bajo pedido para garantizar su máxima calidad y efectividad. Debido a la sensibilidad de sus activos, se recomienda utilizarla en un plazo máximo de 3 meses tras la apertura.

Conservación: Mantener en un lugar fresco, seco y protegido de la luz directa para preservar sus propiedades.',
    skin_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/WhatsAppImage2025-08-15at13.11.15_1.jpg?v=1755817194',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D- Senolytic Sérum
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D- Senolytic Sérum',
    'd-senolytic',
    'Tamaño: 30 mL

Serum D-Senolytic Indicado para pieles maduras a partir de los 35 años. Su fórmula exclusiva contiene un blend de, ácido hialurónico,  PDRN y  NAD⁺, resveratrol, glutatión liposomado, cisteína y vitamina C, activos que actúan a nivel celular para rejuvenecer, fortalecer la barrera cutánea y restaurar el factor hidratante natural (NMF).

Indicaciones: Piel madura seca a sensibles.

Modo de uso: Tres a cuatro veces por semana durante el día o noche, masajear sobre la piel recién limpia y tonificada.

Dosificación: De cinco a diez gotas.

Textura: Ligero y toque seda.

Aroma: Cítrico y cálido.

Caducidad: La fórmula se elabora bajo pedido para garantizar la máxima calidad y eficacia. Dado que contiene activos sensibles a las condiciones ambientales, se recomienda utilizar el producto en un plazo máximo de 3 meses después de abrirlo.

Conservación: Conservar en lugar fresco, seco y alejado de la luz directa.

Precauciones: Uso externo, evitar el contacto directo con los ojos y en caso de irritación suspender uso.

Ingredients: Sodium Hyaluronate , Polydeoxyribonucleotide (PDRN) ,Nicotinamide Adenine Dinucleotide (NAD) , Vitis vinifera extract, (resveratrol) , Ethylhexyl Stearate , Squalane, Glutathione, Cysteine – Amino acid ,Ascorbic Acid (Vitamin C), Citrus, Reticulata (Tangerine), Leuconostoc/Radish Root Ferment Filtrate. Extract, Parfum.

Dermatologicamente probado | Libre de parabenos | No testeado en animales',
    skin_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/WhatsAppImage2025-08-15at13.11.15.jpg?v=1755816880',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 15780, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-GLUT
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-GLUT',
    'd-glut',
    'Da un impulso ao seu desempenho esportivo

L-Glutamina DallÒNutri é um suplemento nutricional que fornece pura glutamina de grau farmacêutico. 

Sua função:

•Estimulando o crescimento da massa muscular, participe da via anti-catabólica e melhore a recuperação pós-treinamento.

•Fortalece o sistema imunológico e o cortisol, que causa descomposição dos tecidos musculares.

•A L-Glutamina também ajuda a melhorar os carboidratos após o treinamento, otimizando a recuperação e impulsionando o crescimento.

Modo de uso: Tomar de 3 a 6 gramas por dia, recomendamos tomar por meses para melhores resultados, fazer um descanso de 1 mês e seguir novamente a pauta. Você pode consumir água durante o treino.  

Contra-indicação: A glutamina deve ser evitada em casos de embaraço ou durante a lactação materna. Simismo, pessoas com doenças renais, doenças graves do fígado, cirrose ou encefalopatia hepática não devem consumir este suplemento. Também deve ser evitado por pessoas com sensibilidade ao glutamato.

Além disso, em algumas pessoas com transtornos psicológicos ou neurológicos, como a epilepsia ou o transtorno bipolar, foi sugerido que o consumo excessivo de glutamina poderia agravar os sintomas, devido à sua conversão em glutamato, um neurotransmisor excitatório.

No entanto, esta conexão não está totalmente confirmada. Pessoas com câncer devem consultar seu oncologista antes de tomar glutamina, pois algumas células cancerígenas podem usar glutamina como fonte de energia para seu crescimento.',
    nutri_cat_id,
    NULL,
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 3280, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- AA8-P
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'AA8-P',
    'aa8-p',
    'VEGANO. SEM GLÚTEN

É um complemento alimentar que contém uma associação de   8 aminoácidos: L-isoleucina, L-Valina, L-lisina, L-metionina, L-treonina, L-triptofano, L-fenilalanina, L-Teanina e MSM-P

Suas funções são:

Maximizar a síntese de proteínas no corpo, ajudar a fortalecer os sistemas de defesa, participar em processos de formação de enzimas e estrutura sanguínea.

Los aminoácidos são responsáveis ​​por todas as construções estruturais de nosso corpo, tecidos conectivos (músculos, huesos e cartilagos), pele e cabelo.

Uma vez ingeridas, são utilizadas rapidamente, pois não é necessária a ação das proteínas (enzimas) para hidrolizarlas.

Os aminoácidos estão presentes nesta fórmula:

1. L-isoleucina : encontra-se nas proteínas e enzimas com características glicogênicas e cetogênicas.

2. L-Valina: aminoácido glicogênico, participa apenas da reação glicolítica, produzindo a glicose final como substituta.

3. L-lisina: Importante na biossíntese de carnitina, colágeno e elastina.

4. L-metionina: participa na produção do superantioxidante da glutationa e é um excelente hepatoprotetor.

5. L-treonina: atua sobre a proteção e a função intestinal, influenciando também na absorção de nutrientes.

6. L-triptófano: precursor da serotonina, importante neurotransmisor do sistema nervoso central.

7. L-fenilalanina : atua na produção de dopamina, um neurotransmissor relacionado à memória, ao estado de espírito, à cognição, à aprendizagem e a alguns movimentos involuntários.  

8. L-Teanina: um aminoácido que auxilia na qualidade do sono e no desempenho cognitivo.

9. Papaína: Facilita a digestão de almidones e proteínas, convertendo os açúcares complexos em açúcares simples, e as proteínas em aminoácidos.

Modo de uso: Tomar de 3 a 6 gramas por dia, recomendamos tomar por   meses para melhores resultados, fazer um descanso de 1 mês e seguir novamente a pauta. Você pode consumir água durante o treino.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/AA8P.webp?v=1752121340',
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 4890, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D -MgC
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D -MgC',
    'd-mgc',
    '60 cápsulas VEGAN. GLUTEN FREE    

 

DIETARY SUPLEMENT    

 

Magnesio Citrato ,es un complemento alimenticio que contiene Magnesio + Ácido Cítrico, tiene alta biodisponibilidad, por lo que el organismo lo absorbe más fácilmente , es suave para el estómago y es la opción preferida para quienes tienen sensibilidad digestiva.

 

Modo de uso: 1-2 cápsula al día, mañana o noche de preferencia dos horas antes o después de comer. no exceder las dosis recomendadas y no está indicado a  gestantes y periodo de lactancia sin recomendación médica.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/dmgc.webp?v=1752121437',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 2850, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- VITB12  METILCOBALAMINA
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'VITB12  METILCOBALAMINA',
    'vitb12-metilcobalamina',
    '30 cápsulas VEGANO. SEM GLÚTEN

+ energia, função cerebral e produção de glóbulos vermelhos.

VitB12 metilcobalamina (vitamina B12), é um complemento nutricional que auxilia na produção de energia, melhora a função cerebral e a produção de glóbulos vermelhos.      

Sua ação:

Proporciona energia às células,

Melhora a função cerebral e nervosa,

Importante para a produção de glóbulos vermelhos

É essencial para pacientes diabéticos e outras afecções.

Modo de uso: 1-2 comprimidos por dia com orientação médica, tomados por via oral, se o comprimido sublingual deve ser colocado abaixo da língua, de preferência pela ingestão fora de comida, ao despertar em ayunas ou antes de dormir.        

Anúncios antes de usar:

•Não deve usar metilcobalamina se for alérgico à vitamina B12 ou ao cobalto.

•Informe seu médico se alguma vez você tiver feito: doença de Leber ou outra forma de dano ao nervo óptico;

•Uma deficiência de ferro ou ácido fólico; ou níveis baixos de potássio no sangue.

•Informe seu médico se estiver envergonhado ou amando.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/VITB12.webp?v=1752123407',
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D- Q10UBI
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D- Q10UBI',
    'd-q10ubi',
    '15ml - 10mg/gota

Ubiquinol gotas lipossomado ultrapuro + Energia para vida mitocondrial

É um complemento alimentar à base de MaxSolve™ Coenzima Q10 ou ubiquinona, um antioxidante natural lipossolúvel presente em quase todas as células do corpo humano.

Estudos avaliaram que melhoram a respiração celular e a produção de ATP, reduzem a fadiga mitocondrial e atuam como um melhor transportador na cadeia de transporte de elétrons nas membranas mitocondriais.

Níveis adequados de CoQ10 são necessários para processos como respiração celular e produção de ATP. Além disso, ajuda em doenças crônicas, neurodegenerativas e cardiovasculares, dislipidemia e longevidade.

Fórmula diferencial de nossa

Nossa fórmula tem a capacidade de fornecer solubilização e aumentar a biodisponibilidade oral de compostos lipófilos e/ou de baixa solubilidade em água, por meio da formação de uma nano emulsão.

Para isso foram utilizados fosfolípidos, predominantemente fosfatidilcolina, que são os principais ingredientes responsáveis ​​pela formação e versatilidade da tecnologia,   oferecendo vendas em relação a outras fórmulas como; é incorporado no núcleo da estrutura, não na membrana com capacidade para transportar 20% do ativo e é muito mais estável a diferentes temperaturas e pH.

Modo de uso: Cada gota de MaxSolve™ contém 10 mg de CoQ10, tomar de 5 a 10 gotas em água ou outra bebida, por escolha e tomar uma vez ao dia.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/q10.webp?v=1752123529',
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 3000, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-CREAT
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-CREAT',
    'd-creat',
    'Mais energia física e mental, para transformar seu esforço em resultados.

La Creatina é um composto encontrado em nosso corpo (95% do total de creatina é encontrado nos músculos e no resto do coração e do cérebro.

- Está formado por três aminoácidos precursores: Glicina, Arginina e Metionina.

- A concentração normal de creatina plasmática é de 50 a 100 mmol/l.

- Em um homem prometido que pesa 70 kg, estima-se que sejam 2 gramas.

- Diariamente você pode calcular o consumo de Creatina através da ingestão exógena de alimentos como carne ou pescado (o consumo médio de Creatina em uma dieta mista é de aproximadamente 1 g) e o resto é completado através de síntese endógena.

A CREATINA TEM   HISTÓRIA.

·1832: o francês Chevreul identifica uma molécula de nitrogênio na carne.

·1847: Lieberg concluiu que o acúmulo de Creatina no corpo está diretamente relacionado e envolvido na produção do trabalho muscular.

·1900: Inicia a investigação sobre a suplementação com creatina.

·1960: A Creatina é extraída da carne. A produção de Creatina sintética começou a ser utilizada inicialmente pelos países que formaram a União Soviética.

· 1992 : algunos atletas olímpicos ingleses suplementados com creatina. Los Juegos Olímpicos de Barcelona e Atlanta foram chamados de "Los Juegos de la Creatina", devido a que um número significativo de atletas suplementados com Creatina lograram medalhas de ouro.

MECANISMO DE EXOCITOSE DE CREATINA

- A Creatina pode ser convertida em fosfocreatina por meio da Creatina que Cisteína: é um aminoácido não essencial, azufrado com propriedades comprovadas.

 

- Sua ação antioxidante é essencial para as funções respiratórias, hepáticas, imunológicas e também do cabelo, da pele e das unhas.

 

- A fosfocreatina se difunde para o citosol e depois a enzima citosólica da Creatina Quina se converte em Creatina, liberando ATP.

 

- O ATP inibe os canais de potássio, o que se reflete na despolarização celular e na abertura dos canais de cálcio dependentes de tensão,

 

- A partir daí, os níveis de cálcio intracelular são produzidos por exocitose de Creatina.

 

COMO DEBEMOS INGERIR LA CREATINA PARA TENER BUENOS RESULTADOS

 

São necessários 21 dias para saturar as células musculares.

 

Sua capacidade de gerar energia aumenta.

 

É o combustível de maior energia comprovado.

 

Trabalharemos mais duro no treinamento de força e resistência.

 

Empezamos com 5 gramas por dia durante 15-21 que se acumulam no corpo (nos saturamos).

 

RECUERDA: UNA VEZ INICIADO SU USO, NO DEBES INTERRUMPIRLO.

Recomendação: Não use como substitutos de uma dieta variada, equilibrada e um estilo de vida saudável, não exceda as doses recomendadas sem orientação de um médico ou nutricionista, se estiver tomando algum medicamento ou sofra alguma doença, indicado para crianças ou embarazadas, mantenha-se fora do alcance das crianças, conserve bem o cerrado em local fresco e seco.

 ¿LA CREATINA ENGORDA? DESINFORMAÇÃO É A RESPOSTA

A Creatina potencializa a capacidade de gerar energia no músculo.

·       Acumula água no músculo e não no tecido adiposo.

Estudos aconselham seu uso em pessoas maiores para melhorar a função cognitiva.

 COMPARANDO OS TIPOS DE CREATINA

Após uma revisão da diferença entre Monohidrato de Creatina e Clorhidrato de Creatina, os resultados foram semelhantes em termos de eficácia, no entanto, encontramos algumas diferenças no Clorhidrato; tem o PH mais baixo, o que significa menos efeitos adversos, maior solubilidade e mais biodisponibilidade.

¿LA CREATINA TIENE EFEITOS ADVERSOS?

Não há evidência de que a Creatina causa danos hepáticos ou renais, a menos que exista um problema hepático ou renal preexistente (razão por qual deve consultar um nutricionista ou médico)

No entanto, anunciamos contra a ingestão excessiva de Creatina, pois pode provocar dor de estômago e diarréia, e se não aumentar a ingestão de água, pode sofrer calamidades e desidratação.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/creat.webp?v=1752123759',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 4500, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-COLLAGEN+
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-COLLAGEN+',
    'd-collagen',
    'Crie uma fórmula única que ajuda a prevenir as disfunções do tecido conectivo e melhorar a elasticidade da pele, reduzindo a profundidade das rugas. Com D-COLLAGEN+, você sentirá uma pele mais hidratada,   seu cabelo e suas unhas terão um aspecto mais saudável.

D-COLLAGEN+ é um complemento alimentar que contém uma mistura de Extratos vegetais, Péptidos de colágeno Verisol®, Citrato de Magnésio, Resveratrol, Silício Orgânico, Ácido Hialurônico, Cisteína, Vitamina C (ácido ascórbico) e MSM-Blend.

Você sabia que perdemos colágeno com a idade para uma dose de 1% aproximadamente na idade adulta a partir dos 25 anos, e entre um 1% e um 2% aos 44 e 60 anos? Esta perda se acentuou durante a menopausa e a andropausia .

Além disso, fatores como a má alimentação, o abuso do sol, o álcool e o tabaco, o manejo inadequado do estresse e das emoções, a falta de sono e a contaminação eletromagnética são fatores chamados epigenéticos que contribuem para essa diminuição.

 

O   SEGREDO DO   D-COLÁGENO+

Uns de nossos segredos é nosso método de fabricação é a chave para que nossa fórmula seja única. Cada princípio ativo é fundido em tempos diferentes para obter uma sinergia perfeita e resultados seguros.

Associamos os péptidos de colágeno: Os péptidos de colágeno Verisol®, para suas vendas fisiológicas que estimulam as funções corporais.

Sua curta longitude facilita sua assimilação, tem uma excelente solubilidade em água fria, sem falar de seu baixo peso molecular (2.000 a 5.000 dalton e menos de 10.000 g/mol) que facilita seu passo através da parede intestinal e se acumula no sangue em apenas 15 - 30 minutos.

 

Associamos ativos   selecionados para aumentar a resposta bioquímica de nossa fórmula, que torna   uma fórmula única:

 

·Cisteína: é um aminoácido não essencial, azufrado com propriedades comprovadas. Sua ação antioxidante é essencial para as funções respiratórias, hepáticas, imunológicas e também para o cabelo, a pele e as unhas.

 

·Resveratrol:   um superantioxidante que controla o estresse oxidativo e é   neuroprotetor. Estudos relatam que países como França apresentam menor incidência de eventos cardiovasculares e cerebrovasculares.

 

·Vitamina C: sua função na fórmula fortalece o poder antioxidante do Resveratrol e da   Cisteína.

 

· Citrato de Magnésio: suas propriedades metabólicas reguladoras do sistema digestivo, é suave para o estômago e ajuda a proteger a eficácia de outros nossos ativos.

 

·Silício Orgânico: contribui para a estrutura e elasticidade do tecido conectivo, além de desempenhar um papel importante na síntese óssea e no colágeno do cartilagem e da pele.

 

·Ácido Hialurônico: é um glicosaminoglicano (GAG), tem a propriedade de absorver grande quantidade de água e, por isso, é responsável pela elasticidade e firmeza abaixo de suas condições mecânicas.

 

·MSM-P: (Metilsulfonilmetano com Papaína) é um componente natural do azufre e um nutriente essencial para a produção das proteínas que se encontram no tejido conectivo e na papaína, auxilia na assimilação dos ativos para manter a integridade da mucosa intestinal.

 

Modo de uso: 5 gramas por dia, um dosificador, recomendamos tomar 3 meses para melhores resultados, fazer um descanso de 1 mês e seguir novamente a pauta.

 

Se você pode consumir o suco de frutas, infusões ou preparo com frutas congeladas obtendo um delicioso helado, os resultados são notados a   partir de 4 semanas de uso contínuo do dosificador diário.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/collagen.webp?v=1752123898',
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 4800, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-FICUGI
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-FICUGI',
    'd-ficugi',
    '30 cápsulas VEGANO. SEM GLÚTEN

Ação senolítica,  antioxidante  e antiinflamatória

D-FICUGI é um complemento nutricional com extratos de raiz de cúrcuma (Curcuma longa), curcumina e curcuminoides, jengibre (gingeroles) e Fisetina com Novusetina com ação antioxidante senolítica.

Ação da fórmula

•Antioxidante e senolítico, contribui para um envejecimiento saudável.

•Ajuda a manter os níveis de glutação e a função mitocondrial na presença de estresse oxidativo.

• Contém ativos que têm o potencial de cruzar a barreira hematoencefálica, o que pode ajudar a manter a função neuronal, incluindo um alto valor no controle da dor articular.

 

Modo de uso: 1-4 cápsulas por dia fora dos alimentos',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/ficugi.webp?v=1752123958',
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-RESQUER
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-RESQUER',
    'd-resquer',
    '30 cápsulas VEGANO. SEM GLÚTEN

A ação senolítica contribui para o funcionamento antioxidante, antiinflamatório e antialérgico.

É um complemento alimentar à base de plantas e antioxidantes como Photosome Quercetin de Japanischem Schnurbaum (Saphora Japonical) Quercefit®. Polygonum cuspidatum raíz Resveratrol, antioxidante poderoso, é uma fórmula defensora de nossa saúde e longevidade, especialmente nos traumas metabólicos que podem ser relacionados com uma grande quantidade de radicais livres.

Modo de uso: 1-2 cápsulas ao dia fora dos alimentos.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/dresquer.webp?v=1752124039',
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-GLUTANAC
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-GLUTANAC',
    'd-glutanac',
    '30 cápsulas VEGAN. GLUTEN FREE

DIETARY SUPLEMENT

Es glutatión reducida, Vitamina B3 (Niacinamida), Vitamina C (Ácido Ascórbico), Citrato de Magnesio y MSM-P Blend, antiaglomentante, estearato de magnesio  y una capsula ( Celulose) gastroresitenteinflamatoria, auxilian en na inmunidad de  la   piel  y sistema respiratorio.

Modo de uso: Mayores de 12 años , 1-2 cápsulas al día fuera de las comidas, no exceder las dosis recomendadas y no está indicado en pacientes en uso tratamientos oncológicos , gestantes y periodo de lactancia sin recomendación médica.

Peso Neto: 29.75g

Ingredientes: N-Acetil Cisteína,  glutatión reducida, Vitamina B3 (Niacinamida), Vitamina C (Ácido Ascórbico), Citrato de Magnesio y MSM-P Blend, antiaglomentante, estearato de magnesio  y una capsula ( Celulose) gastroresitente.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/glutanac.webp?v=1752124098',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 3890, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-SEZIL
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-SEZIL',
    'd-sezil',
    '60 cápsulas VEGAN. GLUTEN FREE

Es complemento alimenticio con un Blend de:  selenio quelato , zinc quelato  y L-lisina auxilia en  reforzar las defensas y a potenciar la función celular .

Ingredientes: selenio quelato , zinc quelato  y L-lisina y antiaglomentante, estearato de magnesio  y una capsula ( Celulose)

Modo de uso:  1-3  cápsula al día fuera de las comidas. no exceder las dosis recomendadas y no está indicado a  gestantes y periodo de lactancia sin recomendación médica.

Peso Neto: 43.3g',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/DSEZIL.webp?v=1752124170',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 3092, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-KADE
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-KADE',
    'd-kea',
    '60 cápsulas VEGAN. GLUTEN FREE

DIETARY SUPLEMENT

Es un  complemento alimenticio  que asocia un  blend   vitamina D3,  K2, E  y A, auxilian en  la  salud  de la piel , ósea, vascular, cardíaca e inmunitaria.

Modo de uso:  Mayores de 12 años , 1-2 cápsula al día, de preferencia por la mañana o después de comidas ricas en grasas y  no exceder las dosis recomendadas y no está indicado a  gestantes y periodo de lactancia sin recomendación médica.

Peso Neto: 52.50g

Ingrediente: vitamina D3 (Colecalciferol),K2 (menaquinona mk7) y Vitaminas E Acetato de   Alfa Tocoferol, Vitamina -A Retinol, ( agente de carga, Maltodextrina ( Antiaglomerantes) , estearato de magnesio y cápsula ( Celulosa).',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/dkea.webp?v=1752124279',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 4620, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-VITC
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-VITC',
    'd-vitc',
    '60 cápsulas  VEGAN. GLUTEN FREE

DIETARY SUPLEMENT

D-VitCL,   es un complemento  alimenticio que contiene  Vitamin C  liposoma , que permite obtener una óptima asimilación  de la  Vitamina C ,auxilia en la   defensa  de  salud la piel ,encías, dientes y huesos. 

Modo de uso: 1-4 cápsulas al día  después de las comidas no exceder las dosis recomendadas y no está indicado a  gestantes y periodo de lactancia sin recomendación médica.

Peso neto: 52.50g

Ingredientes: Vitamina C -Ascorbil palmitato, Complejo liposomal (fosfatidil colina, àcido palmítico, àcido oleico), agente de carga: celulosa microcristalina; antiaglomerante: sales de magnesio de ácidos grasos, dióxido de sílice cápsula de celulosa vegetal.

Almacenamiento: Mantener en lugar fresco seco
Alérgeno: Puede contener traza de lactosa, por elaborarse en instalaciones con productos que las contienen.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/VITC.webp?v=1752124490',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 0, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-OMEGA-3
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-OMEGA-3',
    'd-omega-3',
    '80 cápsulas VEGANO. SEM GLÚTEN

Boa saúde cardiovascular, cerebral e visual.

É um complemento alimentar que inclui uma mistura de DHA e EPA, que contribui para o funcionamento normal do coração, para a manutenção de uma pressão arterial normal e para alguns níveis normais de triglicéridos no sangue.

O DHA demonstrado contribui para a manutenção da função cerebral normal e da visão, bem como para a manutenção dos níveis normais de triglicéridos no sangue.

Quantidade por 1 cápsula lisa: Contém 400 mg de EPA + 300 mg de DHA.

Modo de uso: você pode tomar de 1 a 5 cápsulas por dia de acordo com as necessidades específicas, conforme indicado a seguir:

• 1 cápsula lisa ao dia: benéfica para o funcionamento normal do coração.

• 2-3 cápsulas suaves ao dia: ajudam a manter níveis normais de triglicéridos no sangue.

• 5 cápsulas suaves ao dia:  ajudam a manter a pressão arterial normal.

Advertências:  Não superar o nível de consumo diário adicional de 5 g de EPA e DHA combinados.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/DOMEGA3.webp?v=1752124558',
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 3683, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-BEVAC
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-BEVAC',
    'd-bevac',
    '30 cápsulas VEGANO. SEM GLÚTEN

SUPLEMENTO ALIMENTAR

É um complemento alimentar que: Extrato de Berberis aristata, agente de carga (celulose microcristalina, minerais como vanádio e picolinato de cromo, que auxilia no controle do apetite, melhorando a função metabólica.

Modo de uso:  1-2 cápsulas ao dia fora dos alimentos de preferência antes de dormir. não exceda as doses recomendadas, não é indicado para gestantes e período de lactação sem recomendação médica.

Ingredientes: Extrato de Berberis aristata, agente de carga (celulosa microcristalina, minerais como vanádio e picolinato de cromo, óxido de zinco, (anti aglomerante), estearato de magnésio e cápsula (celulosa).

Peso líquido: 44,30g | 250% Picolinato de Cromo',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/bevac.webp?v=1752124619',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 3890, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-ALMOT
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-ALMOT',
    'd-almot',
    '60 cápsulas VEGANO. SEM GLÚTEN

Auxilia no metabolismo dos carboidratos, gorduras e proteínas, melhorando a resistência à insulina .

É um complemento alimentar composto por uma mistura de extrato vegetal de moringa, ácido alfa-lipóico e L-taurina. A fórmula revela propriedades que auxiliam no metabolismo dos carboidratos, gorduras e proteínas, melhorando a resistência à insulina.  

Modo de uso:   1-2 cápsulas por dia fora dos alimentos de preferência pelas manhãs, dependendo da orientação do médico ou nutricionista.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/almot.webp?v=1752124690',
    false,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 3890, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-VITBs
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-VITBs',
    'd-vitbs',
    '30 cápsulas VEGAN. GLUTEN FREE

DIETARY SUPLEMENT

Es un complemento alimenticio con Vitamina del grupo B como: Tiamina (B1), Riboflavina (B2), Niacinamida (B3), Ácido Pantoténico (B5), Piridoxina (B6), Ácido Fólico (B9) y Metilcobalamina (B12) ,   que contribuyen  al buen funcionamiento celular de la piel, el cabello, la visión y el sistema nervioso.

Modo de uso: adulto mayores de 12 años , 1 cápsula al día, de preferencia por la mañana en ayuno, no exceder las dosis recomendadas, no está indicado para gestantes y periodo de lactancia sin recomendación médica.

Ingredientes: Tiamina (B1), Riboflavina (B2), Niacinamida (B3), Ácido Pantoténico (B5), Piridoxina (B6), Ácido Fólico (B9) y Metilcobalamina (B12)  y antiaglomentante, estearato de magnesio  y una capsula ( Celulose).

Peso neto: 20.5g',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/VITBS_1.webp?v=1752124768',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 2420, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-TIROUP
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-TIROUP',
    'd-tiroup',
    '30 cápsulas VEGAN. GLUTEN FREE

SUPLEMENTO ALIMENTAR

É um complemento alimentar que contém uma mistura de: Espirulina, L-tirosina, Selênio Vitamina E, mineral e yodo, a sinergia dos ativos auxilia no aumento do metabolismo, vitalidade, motivação e humor.

Modo de uso: Adultos maiores de 12 anos, 1-2 cápsulas ao dia, de preferência 30 minutos antes da comida. Antes de usar consulte seu médico se tiver hipo/hipertiroidismo, não exceda as doses recomendadas, não é indicado para gestantes e período de lactação sem recomendação médica.

Ingredientes: Espirulina, L-tirosina, Selênio (Selenito sódico) e Vitamina E (Acetato de tocoferol) yodo (Yoduro potásico), anti aglomerante, estearato de magnésio e cápsula (celulosa).

Peso neto: 21,75g

Modo de uso: 1-2 cápsula al día, de preferencia 30 minutos antes de la comida. Antes utilizar este consulte tu médico si tiene hipo/hipertiroidismo, no exceder las dosis recomendadas.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/tiroup.webp?v=1752124836',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 3240, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-SLIM
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-SLIM',
    'd-slim',
    '60 cápsulas VEGANO. SEM GLÚTEN

SUPLEMENTO ALIMENTAR

É um complemento alimentar que contém uma mistura de extratos vegetais como: Ortosifón, cola de caballo, diente de león, vara de oro, té rojo, favorecendo a termogênese e melhorando o funcionamento do sistema linfático, ajudando na eliminação de líquidos. 

Modo de uso: Adultos maiores de 12 anos 1-2 cápsulas ao dia, de preferência uso antes das 14:00, devido ao seu poder diurético, se desaconsejam seu uso noturno e não excedam as doses recomendadas.

Advertências: Não está indicado para gestantes e período de lactação sem recomendação médica.

Ingredientes: É um complemento alimentar à base de um Blend de extratos vegetais: Ortosifón (extrato de Orthosiphon), cola de caballo, diente de león, vara de oro (extrato de Goldenrod) e extrato de chá vermelho, anti aglomerante, estearato de magnésio e cápsula (celulosa).

Peso líquido: 44,40g',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/dslim.webp?v=1752124893',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 4820, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

  -- D-HEPATIC
  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)
  VALUES (
    'D-HEPATIC',
    'd-hepatic',
    '60 cápsulas VEGANO. SEM GLÚTEN

SUPLEMENTO ALIMENTAR

Complemento alimentar que contém um Blend  de antioxidantes como: Glutation, Cisteína, Vitamina C e extratos de planta como:  Diente de leon, Cola de caballo, Silimarina, Vitamina C que auxilia  ao bom funcionamento do sistema digestivo.

Modo de uso: Adultos maiores de 12 anos, 2 cápsulas ao dia, de preferência nas manhãs, não exceda as doses recomendadas.

Advertências: Não está indicado para gestantes e período de lactação sem recomendação médica.

Peso líquido: 56,60g

Ingredientes: Glutation reducido, N-Acetyl Cisteina, Diente de leon (Taraxacum officinale), Cola de caballo (equesitum arvence), Cardo Mariano (Silybum mariano) e Silimarina, Vitamina C (Àcido Ascorbico), anti aglomerante, estearato de magnésio agente de carga maltodextrina, cápsula celulosa.',
    nutri_cat_id,
    'https://cdn.shopify.com/s/files/1/0766/2528/1275/files/DHEPATIC.webp?v=1752124957',
    true,
    false,
    ARRAY['both']
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category_id = EXCLUDED.category_id,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    available_on = EXCLUDED.available_on
  RETURNING id INTO pid;

  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)
  VALUES (pid, 'Default', 4820, NULL, true, true, 100)
  ON CONFLICT DO NOTHING;

END $$;

-- Imported 28 products